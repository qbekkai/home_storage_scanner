const { Client } = require('@notionhq/client');

type NotionRequest = {
	property?: string;
	value: string;
};

export default class NotionService {
	private static _initNotion(): typeof Client {
		return new Client({
			auth: process.env.NOTION_SECRET,
		});
	}

	private static async getIdByReference({ pageName }: any): Promise<string> {
		let searchResult = await NotionService.queryingPageFromDatabase({
			property: 'Reference',
			value: pageName,
			databaseName: 'Items',
		});

		return searchResult.results[0]?.id;
	}

	private static async getIdByName({
		pageName,
		databaseName,
	}: any): Promise<string> {
		const notion = NotionService._initNotion();
		let searchResult;
		if (databaseName && !pageName) {
			searchResult = await notion.search({ query: databaseName });
		} else if (pageName) {
			searchResult = await NotionService.queryingPageFromDatabase({
				property: 'Nom',
				value: pageName,
				databaseName,
			});
		}

		return searchResult.results[0]?.id;
	}

	public static async queryingPageFromDatabase({
		property,
		value,
		databaseName,
	}: NotionRequest & { databaseName: string }): Promise<any> {
		const notion = NotionService._initNotion();
		const databaseId = await NotionService.getIdByName({ databaseName });

		return await notion.databases.query({
			database_id: databaseId,
			filter: {
				property,
				rich_text: {
					equals: value,
				},
			},
		});
	}

	public static async findItemsInAContainer({
		value,
	}: NotionRequest): Promise<any> {
		const notion = NotionService._initNotion();
		const databaseId = await NotionService.getIdByName({
			databaseName: 'Items',
		});
		const constainerPageId = await NotionService.getIdByName({
			pageName: value,
			databaseName: 'Contenants',
		});

		return await notion.databases.query({
			database_id: databaseId,
			filter: {
				property: 'Contenants',
				relation: {
					contains: constainerPageId,
				},
			},
		});
	}

	public static async isItemExistOnContainer({
		value,
		databaseName,
	}: NotionRequest & {
		databaseName: string;
	}): Promise<boolean> {
		const databaseId = await NotionService.getIdByName({ databaseName });
		const response = await NotionService.queryingPageFromDatabase({
			property: 'Reference',
			value,
			databaseName,
		});
		if (response?.results && response?.results.length > 0) {
			const page = response?.results.pop();
			if (page.parent.database_id === databaseId) return true;
			return false;
		}

		return false;
	}

	public static async createPageWhithReference({
		value,
		databaseName,
		targetContainerName,
	}: NotionRequest & {
		databaseName: string;
		targetContainerName: string;
	}): Promise<any> {
		const notion = NotionService._initNotion();

		const databaseId = await NotionService.getIdByName({ databaseName });
		const targetContainerId = await NotionService.getIdByName({
			pageName: targetContainerName,
			databaseName: 'Contenants',
		});

		return await notion.pages.create({
			parent: {
				type: 'database_id',
				database_id: databaseId,
			},
			properties: {
				Reference: {
					rich_text: [
						{
							text: {
								content: value,
							},
						},
					],
				},
				Contenants: {
					relation: [
						{
							id: targetContainerId,
						},
					],
				},
			},
		});
	}

	public static async moveItemToNewContainer({
		itemCode,
		newContainerCode,
	}: {
		itemCode: string;
		newContainerCode: string;
	}): Promise<any> {
		const notion = NotionService._initNotion();

		const itemPageId = await NotionService.getIdByReference({
			pageName: itemCode,
		});

		const newContainerPageId = await NotionService.getIdByName({
			pageName: newContainerCode,
			databaseName: 'Contenants',
		});
		return await notion.pages.update({
			page_id: itemPageId,
			properties: {
				Contenants: {
					relation: [
						{
							id: newContainerPageId,
						},
					],
				},
			},
		});
	}
}
