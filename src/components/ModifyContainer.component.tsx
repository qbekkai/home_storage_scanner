'use client';
import { useContext, useState } from 'react';
import ToggleCard from './ui/ToggleCard.component';
import ScannerContext from '@/contexts/scanner.context';
import InputComponent from './ui/Input.component';

export default function ModifyContainer() {
	const { itemCode, containerCode } = useContext(ScannerContext);

	const modifyItems = async (itemCode: string, containerCode: string) => {
		try {
			const responseContainer = await fetch(`/api/items/${itemCode}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
				},
				body: JSON.stringify({
					itemToMove: itemCode,
					newContainer: containerCode,
				}),
			});
			if (responseContainer) {
				const resContent = (await responseContainer.json()).response;
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ToggleCard
			form={
				<form
					className="p-5 w-full bg-slate-800"
					onSubmit={(e) => {
						e.preventDefault();
						modifyItems(itemCode, containerCode);
					}}
				>
					<InputComponent code={itemCode} what="item" />
					<InputComponent code={containerCode} what="container" />
					<input
						className="p-2 rounded bg-slate-900 w-full text-center border-2 border-slate-400"
						type="submit"
						value="Enregistrer"
					/>
				</form>
			}
		>
			<div></div>
		</ToggleCard>
	);
}
