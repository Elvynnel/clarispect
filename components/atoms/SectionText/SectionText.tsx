import { clsx } from 'clsx';
import { ReactNode } from 'react';

export const SectionText = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<p className={clsx('pb-1 text-sm text-orange-300 md:text-lg 2xl:pb-2 2xl:text-2xl', className)}>
		{children}
	</p>
);
