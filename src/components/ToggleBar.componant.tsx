'use client';
import React from 'react';

export default function ToggleBar({
	setClassInfoBox,
	isOpenBox,
	setIsOpenedInfoBox,
}: any) {
	return (
		<div className="bg-slate-900 py-2">
			<div
				className={`mx-auto rounded-full bg-slate-600 h-2 w-1/2 ${
					isOpenBox ? 'hidden' : ''
				}`}
				onClick={() => {
					setClassInfoBox((prevState: any) =>
						prevState.filter((s: any) => s !== 'h-0'),
					);
					setClassInfoBox((prevState: any) => [...prevState, 'h-auto']);
					setIsOpenedInfoBox(true);
				}}
			></div>
			<div
				className={`mx-auto rounded-full bg-slate-600 h-2 w-1/2 ${
					!isOpenBox ? 'hidden' : ''
				}`}
				onClick={() => {
					setClassInfoBox((prevState: any) =>
						prevState.filter((s: any) => s !== 'h-auto'),
					);
					setClassInfoBox((prevState: any) => [...prevState, 'h-0']);
					setIsOpenedInfoBox(false);
				}}
			></div>
		</div>
	);
}
