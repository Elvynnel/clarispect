import { clsx } from 'clsx';
import { ReactNode } from 'react';

export const SectionText = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => (
	<p className={clsx('text-l pb-1 text-orange-300 2xl:pb-2 2xl:text-2xl', className)}>{children}</p>
);
