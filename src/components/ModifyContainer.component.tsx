'use client';
import { useContext, useState } from 'react';
import ToggleCard from './ui/ToggleCard.component';
import ScannerContext from '@/contexts/scanner.context';
import InputComponent from './ui/Input.component';
import { useToast } from '@/contexts/toast.context';

export default function ModifyContainer() {
	const [loading, setLoading] = useState<boolean>(false);

	const { pushToast } = useToast();
	const { itemCode, containerCode } = useContext(ScannerContext);

	const modifyItems = async (itemCode: string, containerCode: string) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/items/${itemCode}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
				},
				body: JSON.stringify({
					newContainer: containerCode,
				}),
			});
			if (response && response.status === 200) {
				pushToast({
					content: `L'item <${itemCode}> est bien dans le contenant <${containerCode}>.`,
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
						value={loading ? 'Loading...' : 'Enregister'}
					/>
				</form>
			}
		>
			<div></div>
		</ToggleCard>
	);
}
