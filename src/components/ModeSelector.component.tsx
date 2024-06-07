'use client';
import ScannerContext from '@/contexts/scanner.context';
import { useState, useContext } from 'react';

export default function ModeSelector({ setMode }: any) {
	const { clearCode } = useContext(ScannerContext);

	const [readPos, setReadPos] = useState<
		'top-2 left-2' | '-top-[4.75rem] left-9'
	>('top-2 left-2');
	const [addPos, setAddPos] = useState<
		'top-2 left-2' | '-top-[4.25rem] -left-6'
	>('top-2 left-2');
	const [modifyPos, setModifyPos] = useState<
		'top-2 left-2' | '-top-6 -left-[4.25rem]'
	>('top-2 left-2');
	const [deletePos, setDeletePos] = useState<
		'top-2 left-2' | '-left-[4.75rem] top-9'
	>('top-2 left-2');
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openMenuMode = () => {
		if (!isOpen) {
			setReadPos('-top-[4.75rem] left-9');
			setAddPos('-top-[4.25rem] -left-6');
			setModifyPos('-top-6 -left-[4.25rem]');
			setDeletePos('-left-[4.75rem] top-9');
			setIsOpen(true);
		} else {
			setReadPos('top-2 left-2');
			setAddPos('top-2 left-2');
			setModifyPos('top-2 left-2');
			setDeletePos('top-2 left-2');
			setIsOpen(false);
		}
	};

	const changeMode = (mode: string) => {
		clearCode();
		setMode(mode);
	};
	return (
		<div
			className="aspect-square cursor-pointer absolute w-20 rounded-full bg-slate-900 bottom-48 right-5 border border-slate-600"
			onClick={() => {
				openMenuMode();
			}}
		>
			<p
				className={`text-5xl absolute inset-0 text-center leading-none font-bold rotate-90 ${
					!isOpen ? '' : 'hidden'
				}`}
			>
				...
			</p>
			<p
				className={`text-5xl absolute inset-0 text-center leading-normal font-bold ${
					isOpen ? '' : 'hidden'
				}`}
			>
				x
			</p>
			<button
				onClick={() => {
					changeMode('read');
				}}
				className={`aspect-square absolute w-14 overflow-hidden rounded-full bg-slate-800 ${readPos} ${
					isOpen ? '' : 'hidden'
				}`}
			>
				Read
			</button>
			<button
				onClick={() => {
					changeMode('add');
				}}
				className={`aspect-square absolute w-14 overflow-hidden rounded-full bg-slate-800 ${addPos} ${
					isOpen ? '' : 'hidden'
				}`}
			>
				Add
			</button>
			<button
				onClick={() => {
					changeMode('modify');
				}}
				className={`aspect-square absolute w-14 overflow-hidden rounded-full bg-slate-800 ${modifyPos} ${
					isOpen ? '' : 'hidden'
				}`}
			>
				Modif
			</button>
			<button
				disabled
				onClick={() => {
					changeMode('delete');
				}}
				className={`aspect-square absolute w-14 overflow-hidden rounded-full bg-slate-800 disabled:text-neutral-400 disabled:bg-neutral-800 ${deletePos} ${
					isOpen ? '' : 'hidden'
				}`}
			>
				Del
			</button>
		</div>
	);
}
