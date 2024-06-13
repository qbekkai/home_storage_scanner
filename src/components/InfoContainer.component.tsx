'use client';
import { useContext, useState, useEffect } from 'react';
import ToggleCard from './ui/ToggleCard.component';
import ScannerContext from '@/contexts/scanner.context';
import InputComponent from './ui/Input.component';
import { useToast } from '@/contexts/toast.context';

export default function InfoContainer() {
	const { containerCode } = useContext(ScannerContext);

	const { pushToast } = useToast();
	const [loading, setLoading] = useState<boolean>(false);
	const [items, setItems] = useState<Array<any>>([]);

	useEffect(() => {
		if (!containerCode) {
			setItems([]);
		}
	}, [containerCode]);

	const findItems = async (code: string) => {
		setLoading(true);
		setItems([]);
		try {
			const response = await fetch(`/api/containers/${code}/items`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			});

			if (response) {
				const resContent = await response.json();

				setItems(resContent.page.results);
			}
		} catch (err: any) {
			setLoading(false);
			pushToast({
				content: err.toString(),
				type: 'danger',
				duration: 60,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<ToggleCard
			items={items}
			form={
				<form
					className="p-5 w-full bg-slate-800"
					onSubmit={(e) => {
						e.preventDefault();
						findItems(containerCode);
					}}
				>
					<InputComponent code={containerCode} what="container" />
					<input
						className="p-2 rounded bg-slate-900 w-full text-center border-2 border-slate-400"
						type="submit"
						value={loading ? 'Loading...' : 'Rechercher'}
					/>
				</form>
			}
		>
			{items && items.length === 0 ? null : (
				<>
					<hr className="w-3/4 mx-auto" />
					<h2 className="px-5 py-2 text-center w-full">
						Contenant : {containerCode}
					</h2>
					{/* <div className="pb-3"> */}
					<ul className="px-5">
						<li className="py-1 border-b-2 flex justify-between">
							<span>Titre</span> <span>Ref</span>
						</li>
						<div className="h-96 overflow-auto">
							{items?.map((item: any) => (
								<>
									<li
										key={item.id}
										className="py-2 border-t flex justify-between"
									>
										{item?.properties?.Nom?.title.length > 0 ? (
											<span>
												{
													item?.properties?.Nom?.title[0]
														?.plain_text
												}
											</span>
										) : (
											<span className="text-gray-500">
												Sans titre
											</span>
										)}

										<span>
											{
												item?.properties?.Reference?.rich_text[0]
													?.plain_text
											}
										</span>
									</li>
								</>
							))}
						</div>
					</ul>
					{/* </disv> */}
				</>
			)}
		</ToggleCard>
	);
}
