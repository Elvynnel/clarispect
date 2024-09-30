'use client';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';

import { ScrubBar } from '@/components/molecules/ScrubBar/ScrubBar';
import { Clip } from '@/types/clip';

export const VideoPlayer = ({ clip }: { clip: Clip }) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
	const [isMuted, setIsMuted] = useState<boolean>(false);

	const onPlayPause = () => {
		const videoEl = videoRef.current;

		if (videoEl) {
			if (isPlaying) {
				videoEl.pause();
				setIsPlaying(false);
			} else {
				videoEl.play();
				setIsPlaying(true);
			}
		}
	};

	return (
		<div className="flex flex-col items-center">
			<p>{clip.name}</p>
			<div>
				<video
					controls={false}
					aria-label="Video player"
					poster={clip.thumbnail}
					ref={videoRef}
					//TODO: Dynamic video size?
					className={clsx(
						'w-[1280px] object-cover',
						isPlaying === null ? 'h-[728px]' : 'h-[720px]',
					)}
					onEnded={() => setIsPlaying(false)}
					onClick={onPlayPause}
				>
					<source key={clip.id} src={clip.videoUrl} />
					Your browser does not support the video tag.
				</video>
				<ScrubBar videoRef={videoRef} />
			</div>
			<div className="flex gap-4 pt-4">
				<button onClick={onPlayPause}>{isPlaying ? 'Stop' : 'Start'}</button>
				<button
					onClick={() => {
						if (videoRef.current && videoRef.current.currentTime > 0)
							videoRef.current.currentTime -= 10;
					}}
				>
					Prev 10s
				</button>
				<button
					onClick={() => {
						if (videoRef.current && videoRef.current.currentTime < videoRef.current.duration)
							videoRef.current.currentTime += 10;
					}}
				>
					Next 10s
				</button>
				<button
					onClick={() => {
						if (!videoRef.current) return;

						if (isMuted) {
							setIsMuted(false);
							videoRef.current.muted = false;
						} else {
							setIsMuted(true);
							videoRef.current.muted = true;
						}
					}}
				>
					{isMuted ? 'Unmute' : 'Mute'}
				</button>
			</div>
		</div>
	);
};
