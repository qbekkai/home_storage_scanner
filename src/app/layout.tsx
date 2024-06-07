'use client';
import React, { useEffect } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../style/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [w, setW] = React.useState<number>();
	const [h, setH] = React.useState<number>();

	React.useEffect(() => {
		setW(window.innerWidth);
		setH(window.innerHeight);
	}, [setW, setH]);

	return (
		<html
			lang="en"
			className={`bg-slate-900 text-white w-[${h}px] h-[${w}px] overflow-hidden`}
		>
			<body className={inter.className + ' w-full h-full relative'}>
				<header className="absolute p-2 w-full z-50">
					<div className="bg-slate-800 w-full p-3 rounded-xl">
						<h1>Home Storage Scanner</h1>
					</div>
				</header>
				{children}
			</body>
		</html>
	);
}
