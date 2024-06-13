import NotionService from '@/SERVICES/Notion.service';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: any) {
	try {
		const {
			params: { containerCode },
		} = context;

		const page = await NotionService.findItemsInAContainer({
			value: containerCode,
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
