import { clsx } from 'clsx';
import Link from 'next/link';

import { IconArrowUp } from '@/components/atoms/Icon/Icon';

interface SortLinkProps {
	activeSortKey: 'createdAt' | 'name';
	order: 'asc' | 'desc';
	sortKey: 'createdAt' | 'name';
	sortParamName: string;
}

export const SortLink = ({ activeSortKey, order, sortKey, sortParamName }: SortLinkProps) => {
	const isActive = sortKey === activeSortKey;

	return (
		<Link href={`?sortBy=${sortKey}&order=${order === 'asc' ? 'desc' : 'asc'}`}>
			<p
				className={clsx(
					'flex min-w-16 items-center hover:text-orange-300',
					isActive ? 'font-bold text-orange-300' : 'font-thin text-white',
				)}
			>
				{sortParamName}
				{isActive && (
					<IconArrowUp
						variant="span"
						size="xs"
						className={clsx(
							'transition-transform duration-500 ease-in-out',
							order === 'desc' ? 'rotate-180' : 'rotate-0',
						)}
						colorClassName="bg-orange-300"
					/>
				)}
			</p>
		</Link>
	);
};
