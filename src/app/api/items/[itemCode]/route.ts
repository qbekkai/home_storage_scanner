import NotionService from '@/services/Notion.service';
import { NextResponse, type NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, context: any) {
	const {
		params: { itemCode: itemCodeToMove },
	} = context;
	const { newContainer }: any = await request.json();
	const condainers_database_id = '68a354b80c1049759ffc57e3e7bfb99d';
	const items_database_id = 'f7312acc8d6e47b496d431809a6e3c17';

	const itemToMovePageId = await NotionService.queryingPageIdFromDatabase(
		'Reference',
		itemCodeToMove,
		{ databaseId: items_database_id },
	);

	const newContainerPageId = await NotionService.queryingPageIdFromDatabase(
		'Nom',
		newContainer,
		{
			databaseId: condainers_database_id,
		},
	);

	const page = NotionService.movePage(itemToMovePageId, newContainerPageId);
	return NextResponse.json(page);
}
