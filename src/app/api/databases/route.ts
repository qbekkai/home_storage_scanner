import NotionService from '@/services/Notion.service';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const property = searchParams.get('property');
	const value = searchParams.get('value');

	const page = await NotionService.queryingPageFromDatabase(property, value);

	return NextResponse.json(page);
}

// https://www.notion.so/f7312acc8d6e47b496d431809a6e3c17?v=f1c3257e816d42bc989f637326b5ba4a&pvs=4
// https://www.notion.so/68a354b80c1049759ffc57e3e7bfb99d?v=bea737a8405b4da78042f0c9330913d8&pvs=4
// https://www.notion.so/39bee93e40e44b6f937604cfabd19f16?pvs=4
