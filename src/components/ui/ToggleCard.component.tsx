'use client';
import React from 'react';
import ToggleBar from '../ToggleBar.componant';

export default function ToggleCard({
	items,
	form,
	children,
}: {
	items?: Array<any>;
	form: React.ReactNode;
	children?: React.ReactNode;
}) {
	const [classInfoBox, setClassInfoBox] = React.useState<Array<string>>([
		'h-auto',
		'max-h-[450px]',
		'overflow-hidden',
	]);
	const [isOpenBox, setIsOpenedInfoBox] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (items && items.length > 0) {
			setClassInfoBox((prevState) => prevState.filter((s) => s !== 'h-0'));
			setClassInfoBox((prevState) => [...prevState, 'h-auto']);
			setIsOpenedInfoBox(true);
		}
	}, [items]);

	return (
		<section
			className={`absolute bottom-3 left-0 right-0 mx-3 z-50 rounded-xl overflow-auto`}
		>
			<ToggleBar
				setClassInfoBox={setClassInfoBox}
				isOpenBox={isOpenBox}
				setIsOpenedInfoBox={setIsOpenedInfoBox}
			/>
			<div className="bg-slate-800">
				{form}
				<div className={classInfoBox.join(' ')}>{children}</div>
			</div>
		</section>
	);
}
