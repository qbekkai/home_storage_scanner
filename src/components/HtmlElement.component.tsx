'use client';
import React, { useEffect, useState, ReactNode } from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const [w, setW] = useState<number>();
	const [h, setH] = useState<number>();

	useEffect(() => {
		setW(window.innerWidth);
		setH(window.innerHeight);
	}, [setW, setH]);

	return (
		<html
			lang="en"
			className={`bg-slate-900 text-white w-[${h}px] h-[${w}px] overflow-hidden`}
		>
			{children}
		</html>
	);
}
