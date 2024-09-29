import { notFound } from 'next/navigation';

import { Clip } from '@/app/api/clips/route';

export default async function PreviewPage({ params: { id } }: { params: { id: string } }) {
	const response: Response = await fetch(`http://localhost:4000/api/clips/${id}`);
	if (!response.ok) {
		notFound();
	}
	const clip: Clip = await response.json();

	return (
		<video
			controls
			aria-label="Video player"
			className="h-[450px] w-full md:h-[650px] lg:h-[650px] "
			poster={clip.thumbnail}
		>
			<source key={clip.id} src={clip.videoUrl} />
			Your browser does not support the video tag.
		</video>
	);
}
