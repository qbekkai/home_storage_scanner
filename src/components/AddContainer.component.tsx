'use client';
import React, { useContext, useState } from 'react';
import ToggleCard from './ui/ToggleCard.component';
import InputComponent from './ui/Input.component';
import ScannerContext from '@/contexts/scanner.context';
import { useToast } from '@/contexts/toast.context';

export default function AddContainer() {
	const [loading, setLoading] = useState<boolean>(false);
	const { itemCode } = useContext(ScannerContext);
	const { pushToast } = useToast();

	const addItems = async (code: string) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/items`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
				body: JSON.stringify({
					reference: code,
					container: 'A_RANGER',
					databaseName: 'Items',
				}),
			});

			if (response && response.status === 201) {
				pushToast({
					title: 'Reference ajoutée',
					content: `La reference <${code}> est bien ajouté`,
					type: 'success',
				});
			} else {
				throw JSON.stringify(await response.json());
			}
		} catch (err: any) {
			pushToast({
				content: JSON.parse(err).message,
				type: 'danger',
			});
		} finally {
			setLoading(false);
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
						value={loading ? 'Loading...' : 'Enregister'}
					/>
				</form>
			}
		/>
	);
}
