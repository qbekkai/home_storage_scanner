import NotionService from '@/services/Notion.service';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body: any = await request.json();
		const page = await NotionService.createPage('Reference', body.reference);

		return NextResponse.json(
			{ page },
			{
				headers: {
					'Content-Type': 'application/json',
				},
				status: 201,
			},
		);
	} catch (err) {
		console.log(err);
	}
}
