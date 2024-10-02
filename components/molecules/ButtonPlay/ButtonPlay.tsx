import { clsx } from 'clsx';

import { IconPlay } from '@/components/atoms/Icon/Icon';

export const ButtonPlay = () => (
	<button
		className={clsx(
			'group flex items-center justify-center rounded-full bg-orange-400 p-4 transition-all duration-500 ease-in-out group-hover:-translate-x-5 group-hover:bg-fuchsia-600',
		)}
	>
		<IconPlay size="m" />
		<span className="font-semibold text-white opacity-0 duration-500 [font-size:0px] group-hover:ml-2 group-hover:text-lg group-hover:opacity-100">
			Play
		</span>
	</button>
);
