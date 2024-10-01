import Image from 'next/image';
import Link from 'next/link';

import { SortLink } from '@/components/molecules/SortLink/SortLink';
import { toClipDateFormat } from '@/helpers/date/date.helpers';
import { Clip } from '@/types/clip';

interface ListingPageProps {
	searchParams: { order: 'asc' | 'desc'; sortBy: 'createdAt' | 'name' };
}

export default async function ListingPage({ searchParams: { order, sortBy } }: ListingPageProps) {
	const apiUrl = new URL('http://localhost:4000/api/clips');
	if (order) apiUrl.searchParams.append('order', order);
	if (sortBy) apiUrl.searchParams.append('sortBy', sortBy);

	async function fetchClips() {
		try {
			const response = await fetch(apiUrl);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching clips:', error);
			return [];
		}
	}

	const clips = await fetchClips();

	return (
		<div>
			<div className="flex items-center justify-end gap-4 px-8 pt-8 align-middle">
				<p>Sort by:</p>
				<div className="flex gap-0">
					<SortLink sortKey="createdAt" order={order} activeSortKey={sortBy} sortParamName="Date" />
					<SortLink sortKey="name" order={order} activeSortKey={sortBy} sortParamName="Name" />
				</div>
				<Link href={'/'}>X</Link>
			</div>
			<div className="grid min-h-screen grid-cols-3 gap-8 p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
				{clips.map(({ createdAt, id, name, thumbnail }: Clip) => (
					<Link
						href={`/${id}`}
						key={id}
						className="transform rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105"
					>
						<Image
							src={thumbnail}
							alt={name}
							className="h-48 w-full rounded-t-lg object-cover"
							width={320}
							height={180}
						/>
						<div className="p-4">
							<h2 className="text-lg font-semibold">{name}</h2>
							<p className="text-sm text-gray-500">{toClipDateFormat(createdAt)}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
