'use client';
import { useEffect, useState, ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../style/globals.css';
import { ToastContextProvider } from '@/contexts/toast.context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	manifest: '/manifest.json',
	title: 'HS-Scanner',
};

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
			<body className={inter.className + ' w-full h-full relative'}>
				<ToastContextProvider>
					<header className="absolute p-2 w-full z-50">
						<div className="bg-slate-800 w-full p-3 rounded-xl">
							<h1>Home Storage Scanner</h1>
						</div>
					</header>
					{children}
				</ToastContextProvider>
			</body>
		</html>
	);
}
