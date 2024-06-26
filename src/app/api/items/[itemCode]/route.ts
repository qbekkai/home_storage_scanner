import NotionService from '@/services/Notion.service';
import { NextResponse, type NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, context: any) {
	try {
		const {
			params: { itemCode: itemCodeToMove },
		} = context;
		const { newContainer }: any = await request.json();

		const page = NotionService.moveItemToNewContainer({
			itemCode: itemCodeToMove,
			newContainerCode: newContainer,
		});
		return NextResponse.json(
			{ page },
			{
				headers: {
					'Content-Type': 'application/json',
				},
				status: 200,
			},
		);
	} catch (err: any) {
		return NextResponse.json(
			{ message: JSON.stringify(err) },
			{
				headers: {
					'Content-Type': 'application/json',
				},
				status: err.status,
			},
		);
	}
}
