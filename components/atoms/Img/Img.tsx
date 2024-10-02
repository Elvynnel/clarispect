import { clsx } from 'clsx';
import Image, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps extends NextImageProps {
	wrapperClassName?: string;
}

export const Img = ({ children, wrapperClassName, ...props }: ImageProps) => {
	const className = clsx('object-cover', props.className);

	return (
		<div className={wrapperClassName}>
			<Image {...props} className={className} />
			{children}
		</div>
	);
};
