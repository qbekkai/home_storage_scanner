'use client';
import { useContext, useState } from 'react';
import ToggleCard from './ui/ToggleCard.component';
import ScannerContext from '@/contexts/scanner.context';
import InputComponent from './ui/Input.component';

export default function InfoContainer() {
	const { containerCode } = useContext(ScannerContext);

	const [items, setItems] = useState<Array<any>>([]);

	const findItems = async (code: string) => {
		try {
			const response = await fetch(
				`/api/databases?property=Contenant&value=${code}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
					},
				},
			);

			if (response) {
				const resContent = (await response.json()).response;
				setItems(resContent.results);
			}
		} catch (err) {}
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
						value="Rechercher"
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
					<div className="overflow-hidden">
						<ul className="px-5 overflow-y-scroll">
							<li className="py-1 border-b-4 flex justify-between">
								<span>Titre</span> <span>Ref</span>
							</li>
							{items?.map((item: any) => (
								<>
									<li
										key={item.id}
										className="py-2 border-b flex justify-between"
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
						</ul>
					</div>
				</>
			)}
		</ToggleCard>
	);
}
