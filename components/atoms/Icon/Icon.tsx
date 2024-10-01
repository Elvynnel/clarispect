import { clsx } from 'clsx';
import { match } from 'ts-pattern';

interface IconProps {
	className?: string;
	colorClassName?: string;
	onClick?: () => void;
	size?: 'xs' | 's' | 'm' | null;
	source?: string;
	variant?: 'div' | 'span';
}

const Icon = ({
	className,
	colorClassName = 'bg-neutral-800',
	onClick,
	size = 's',
	source,
	variant = 'div',
}: IconProps) => {
	const ComponentType = variant === 'span' ? 'span' : 'div';

	const sizeClassNames = match(size)
		.with(null, () => undefined)
		.with('xs', () => 'w-4 h-4')
		.with('s', () => 'w-6 h-6')
		.with('m', () => 'w-8 h-8')
		.exhaustive();

	return (
		<ComponentType
			className={clsx(
				'shrink-0 [mask-position:center] [mask-repeat:no-repeat] [mask-size:cover]',
				colorClassName,
				sizeClassNames,
				source,
				className,
			)}
			onClick={onClick}
		/>
	);
};

type SpecificIcon = Omit<IconProps, 'source'>;

export const IconArrowUp = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/arrow_up.svg")]', className)}
	/>
);
