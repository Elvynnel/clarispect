import { clsx } from 'clsx';
import { match } from 'ts-pattern';

export interface IconProps {
	className?: string;
	colorClassName?: string;
	maskSize?: 'cover' | 'contain';
	onClick?: () => void;
	size?: 'xs' | 's' | 'm' | null;
	source?: string;
	variant?: 'div' | 'span';
}

const Icon = ({
	className,
	colorClassName = 'bg-white',
	maskSize,
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
				'shrink-0 [mask-position:center] [mask-repeat:no-repeat]',
				colorClassName,
				sizeClassNames,
				source,
				maskSize === 'contain' ? '[mask-size:contain]' : '[mask-size:cover]',
				className,
			)}
			onClick={onClick}
		/>
	);
};

type SpecificIcon = Omit<IconProps, 'source'>;

export const IconArrowBackward = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/arrow_backward.svg")]', className)}
	/>
);

export const IconArrowForward = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/arrow_forward.svg")]', className)}
	/>
);

export const IconArrowPlayAgain = ({ className, maskSize = 'contain', ...props }: SpecificIcon) => (
	<Icon
		{...props}
		maskSize={maskSize}
		className={clsx('[mask-image:url("../public/images/svg/arrow_play_again.svg")]', className)}
	/>
);

export const IconArrowUp = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/arrow_up.svg")]', className)}
	/>
);

export const IconMuted = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/muted.svg")]', className)}
	/>
);

export const IconUnmuted = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/unmuted.svg")]', className)}
	/>
);

export const IconPlay = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/play.svg")]', className)}
	/>
);

export const IconPause = ({ className, ...props }: SpecificIcon) => (
	<Icon
		{...props}
		className={clsx('[mask-image:url("../public/images/svg/pause.svg")]', className)}
	/>
);
