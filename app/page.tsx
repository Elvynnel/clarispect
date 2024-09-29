import Image from 'next/image';
import Link from 'next/link';

import { Clip } from '@/app/api/clips/route';

export default async function ListingPage() {
	async function fetchClips() {
		try {
			const response = await fetch('http://localhost:4000/api/clips');
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching clips:', error);
			return [];
		}
	}

	const clips = await fetchClips();

	return (
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
						<p className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
					</div>
				</Link>
			))}
		</div>
	);
}
