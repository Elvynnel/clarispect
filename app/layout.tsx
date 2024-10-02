import './globals.css';

import type { Metadata } from 'next';

import { Header } from '@/components/organisms/Header/Header';
import { aboreto, berkshire } from '@/fonts';

export const metadata: Metadata = {
	description: 'Clarispect video player',
	title: 'Clarispect',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`h-full w-full bg-background bg-cover bg-center ${aboreto.className} ${berkshire.className} antialiased`}
			>
				<Header />
				{children}
			</body>
		</html>
	);
}
