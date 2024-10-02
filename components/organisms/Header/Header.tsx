import { clsx } from 'clsx';

import { berkshire } from '@/fonts';

export const Header = () => (
	<header className="w-full text-white">
		<div className="flex w-min flex-col items-center pl-8 pt-8">
			<h1 className={clsx(berkshire.className, 'text-5xl')}>Clarispect</h1>
			<p className="text-2xl">Cannot unsee</p>
		</div>
	</header>
);
