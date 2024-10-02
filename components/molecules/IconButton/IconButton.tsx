import clsx from 'clsx';
import { match, P } from 'ts-pattern';

import { IconProps } from '@/components/atoms/Icon/Icon';

export const IconButton = ({
	Icon,
	className,
	onClick,
	size = 's',
}: {
	Icon: (props: IconProps) => JSX.Element;
	className?: string;
	onClick?: () => void;
	size?: 'xs' | 's' | 'm';
}) => {
	const sizeClassNames = match(size)
		.with('xs', () => 'w-10 h-10')
		.with('s', () => 'w-12 h-12')
		.with('m', () => 'w-14 h-14')
		.exhaustive();

	const iconSize = match(size)
		.with('xs', () => 'xs' as const)
		.with(P.union('s', 'm'), () => 's' as const)
		.exhaustive();

	return (
		<div
			className={clsx(
				'flex cursor-pointer items-center justify-center rounded-full bg-orange-400 p-4 transition-colors duration-300 ease-in-out hover:bg-fuchsia-800',
				sizeClassNames,
				className,
			)}
			onClick={onClick}
		>
			<Icon size={iconSize} />
		</div>
	);
};
