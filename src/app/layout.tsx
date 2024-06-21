import { ReactNode } from 'react';
import type { Viewport, Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../style/globals.css';
import HtmlElement from '@/components/HtmlElement.component';
import { ToastContextProvider } from '@/contexts/toast.context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	icons: '/maskable_icon_x48.png',
	manifest: '/manifest.json',
	title: 'HS-Scanner',
};
export const viewport: Viewport = {
	themeColor: '#1E313B',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<HtmlElement>
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
		</HtmlElement>
	);
}
