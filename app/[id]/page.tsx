import { notFound } from 'next/navigation';

import { VideoPlayer } from '@/components/organisms/VideoPlayer/VideoPlayer';
import { Clip } from '@/types/clip';

export default async function PreviewPage({ params: { id } }: { params: { id: string } }) {
	const response: Response = await fetch(`http://localhost:4000/api/clips/${id}`);
	if (!response.ok) {
		notFound();
	}
	const clip: Clip = await response.json();

	return (
		<div className="flex flex-col items-center">
			<VideoPlayer clip={clip} />
		</div>
	);
}
