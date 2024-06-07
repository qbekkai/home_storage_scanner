'use client';
import React, { useContext } from 'react';
import ToggleCard from './ui/ToggleCard.component';
import InputComponent from './ui/Input.component';
import ScannerContext from '@/contexts/scanner.context';

export default function AddContainer() {
	const { itemCode } = useContext(ScannerContext);
	const [isAdded, setIsAdded] = React.useState<boolean | null>(null);

	const addItems = async (code: string) => {
		try {
			setIsAdded(null);
			const response = await fetch(`/api/pages`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
				body: JSON.stringify({
					reference: code,
					container: 'A_RANGER',
				}),
			});

			if (response && response.status === 201) setIsAdded(true);
			else setIsAdded(false);
		} catch (err) {
			setIsAdded(false);
		}
	};

	return (
		<ToggleCard
			form={
				<form
					className="p-5 w-full"
					onSubmit={(e) => {
						e.preventDefault();
						addItems(itemCode);
					}}
				>
					<InputComponent code={itemCode} what="item" />
					<input
						className="p-2 rounded bg-slate-900 w-full text-center border-2 border-slate-400"
						type="submit"
						value="Enregister"
					/>
				</form>
			}
		/>
	);
}