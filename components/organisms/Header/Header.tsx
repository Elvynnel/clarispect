import { clsx } from 'clsx';

import { berkshire } from '@/fonts';

export const Header = () => (
	<header className="w-full text-white">
		<div className="flex w-min flex-col items-center pb-2 pl-4 pt-8 md:pl-8 xl:pb-0">
			<h1 className={clsx(berkshire.className, 'text-xl md:text-5xl')}>Clarispect</h1>
			<p className="text-sm md:text-2xl">Cannot unsee</p>
		</div>
	</header>
);
