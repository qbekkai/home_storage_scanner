'use client';
import { useContext } from 'react';
import ScannerContext from '@/contexts/scanner.context';
import { ScanBarcode } from 'lucide-react';

export default function Input({ what, code }: any) {
	const { things, isOnScanningMode, toggleOnScanning } =
		useContext(ScannerContext);

	return (
		<div className="relative mb-3">
			<input
				className="p-2 rounded bg-slate-700 w-full border-b-2 border-slate-400"
				type="text"
				placeholder={`Code barre : ${what}`}
				defaultValue={code}
			/>
			<label
				htmlFor={`activeScan${what[0].toUpperCase()}`}
				className={`absolute top-1 right-1 rounded px-2 py-1 flex justify-center items-center font-black ${
					isOnScanningMode && things === what
						? 'bg-slate-600 text-blue-400'
						: ''
				}`}
			>
				<ScanBarcode height={'100%'} />
				<input
					id={`activeScan${what[0].toUpperCase()}`}
					type="checkbox"
					checked={isOnScanningMode && things === what}
					hidden
					onChange={() => {
						toggleOnScanning(what);
					}}
				/>
			</label>
		</div>
	);
}
