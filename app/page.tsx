import Link from 'next/link';

import { SectionText } from '@/components/atoms/SectionText/SectionText';
import { ClipCard } from '@/components/molecules/ClipCard/ClipCard';
import { SortLink } from '@/components/molecules/SortLink/SortLink';
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

	const clips: Clip[] = await fetchClips();

	return (
		<div className="flex flex-col items-center">
			<div className="my-8 w-11/12 max-w-screen-xl rounded-3xl bg-slate-900 p-8 2xl:max-w-screen-2xl">
				<SortingSection order={order} sortBy={sortBy} />
				<SectionText>Recommended for you</SectionText>
				<ClipCard.Exposed clip={clips[0]} href={`/${clips[0].id}`} />
				<SectionText className="pt-6">More videos</SectionText>
				<div className="grid grid-cols-1 gap-8 pb-20 md:grid-cols-2 lg:grid-cols-3">
					{clips.slice(1).map((clip) => (
						<ClipCard clip={clip} href={`/${clip.id}`} key={clip.id} />
					))}
				</div>
			</div>
		</div>
	);
}

const SortingSection = ({ order, sortBy }: ListingPageProps['searchParams']) => (
	<div className="flex items-center justify-end gap-4 align-middle">
		<p className="text-xs text-white">Sort by:</p>
		<div className="flex">
			<SortLink sortKey="createdAt" order={order} activeSortKey={sortBy} sortParamName="Date" />
			<SortLink sortKey="name" order={order} activeSortKey={sortBy} sortParamName="Name" />
		</div>
		<Link href={'/'} className="p-1 text-xs text-white">
			X
		</Link>
	</div>
);
