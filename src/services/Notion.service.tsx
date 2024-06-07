const { Client } = require('@notionhq/client');

export default class NotionService {
	private static _initNotion(): typeof Client {
		return new Client({
			auth: 'secret_4lEsgshzUvwFtFe8RpP03wPl4fsvXozgdYqaZq4YCbc',
		});
	}

	public static async createPage(
		property: string,
		value: string,
		options?: any,
	): Promise<any> {
		const notion = NotionService._initNotion();

		return await notion.pages.create({
			parent: {
				type: 'database_id',
				database_id:
					options?.databaseId || 'f7312acc8d6e47b496d431809a6e3c17',
			},
			properties: {
				[property]: {
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
							id:
								options?.targetContainer ||
								'74111251-f8f6-4ed9-8173-6e77562a6f30',
						},
					],
				},
			},
		});
	}

	public static async getPageByPageId(pageId: string): Promise<any> {
		const notion = NotionService._initNotion();

		return await notion.pages.retrieve({ page_id: pageId });
	}

	public static async queryingPageFromDatabase(
		property: string | null,
		value: string | null,
		options?: any,
	): Promise<any> {
		const notion = NotionService._initNotion();

		return await notion.databases.query({
			database_id: options.databaseId || 'f7312acc8d6e47b496d431809a6e3c17',
			filter: {
				property,
				rich_text: {
					equals: value,
				},
			},
		});
	}

	public static async queryingPageIdFromDatabase(
		property: string | null,
		value: string | null,
		options?: any,
	): Promise<string> {
		const [page, ...rest] = await NotionService.queryingPageFromDatabase(
			property,
			value,
			options,
		);

		return page.id;
	}

	public static async movePage(
		toMove: string,
		toContainer: string,
	): Promise<any> {
		const notion = NotionService._initNotion();

		return await notion.pages.update({
			page_id: toMove,
			properties: {
				Contenants: {
					relation: [
						{
							id: toContainer,
						},
					],
				},
			},
		});
	}
}
