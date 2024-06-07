export default async function verifyIfExist(
	reference: string,
): Promise<boolean> {
	let notionReference;
	const response = await fetch(`/api/databases?reference=${reference}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});

	if (response) notionReference = await response.json();
	else throw new Error('400, No Response');
	console.log('verifyIfExist', reference);
	console.log('notionReference', notionReference);

	return notionReference.response.results.length == 0 ? false : true;
}
