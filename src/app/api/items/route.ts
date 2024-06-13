import NotionService from '@/services/Notion.service';

import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const body: any = await request.json();
		const isItemExist = await NotionService.isItemExistOnContainer({
			value: body.reference,
			databaseName: body.databaseName,
		});

		if (!isItemExist) {
			const page = await NotionService.createPageWhithReference({
				value: body.reference,
				databaseName: body.databaseName,
				targetContainerName: body.container,
			});

			return NextResponse.json(
				{ page },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					status: 201,
				},
			);
		} else
			return NextResponse.json(
				{ message: `Code <${body.reference}> : Already Exist` },
				{
					headers: {
						'Content-Type': 'application/json',
					},
					status: 400,
				},
			);
	} catch (err: any) {
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{
				headers: {
					'Content-Type': 'application/json',
				},
				status: 500,
			},
		);
	}
}
