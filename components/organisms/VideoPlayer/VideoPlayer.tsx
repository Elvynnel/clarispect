'use client';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { match } from 'ts-pattern';

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

	const onMuteToggle = () => {
		const videoEl = videoRef.current;
		if (!videoEl) return;

		if (isMuted) {
			setIsMuted(false);
			videoEl.muted = false;
		} else {
			setIsMuted(true);
			videoEl.muted = true;
		}
	};

	const onSeekBackward = () => {
		if (videoRef.current && videoRef.current.currentTime > 0) {
			videoRef.current.currentTime -= 10;
		}
	};

	const onSeekForward = () => {
		if (videoRef.current && videoRef.current.currentTime < videoRef.current.duration) {
			videoRef.current.currentTime += 10;
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			match(e.key)
				.with(' ', () => {
					e.preventDefault();
					onPlayPause();
				})
				.with('m', onMuteToggle)
				.with('ArrowLeft', onSeekBackward)
				.with('ArrowRight', onSeekForward)
				.otherwise(() => {});
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isPlaying, isMuted]);

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
				<button onClick={onSeekBackward}>Prev 10s</button>
				<button onClick={onSeekForward}>Next 10s</button>
				<button onClick={onMuteToggle}>{isMuted ? 'Unmute' : 'Mute'}</button>
			</div>
		</div>
	);
};
