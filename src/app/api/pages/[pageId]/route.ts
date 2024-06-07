import NotionService from '@/services/Notion.service';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: any) {
	const { params } = context;
	const page = await NotionService.getPageByPageId(params.pageId);

	return NextResponse.json(page);
}
