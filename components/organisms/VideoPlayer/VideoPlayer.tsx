'use client';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { match } from 'ts-pattern';

import {
	IconArrowBackward,
	IconArrowForward,
	IconArrowPlayAgain,
	IconMuted,
	IconPause,
	IconPlay,
	IconUnmuted,
} from '@/components/atoms/Icon/Icon';
import { SectionText } from '@/components/atoms/SectionText/SectionText';
import { IconButton } from '@/components/molecules/IconButton/IconButton';
import { ScrubBar } from '@/components/molecules/ScrubBar/ScrubBar';
import { berkshire } from '@/fonts';
import { toClipDateFormat } from '@/helpers/date/date.helpers';
import { Clip } from '@/types/clip';

export const VideoPlayer = ({ clip }: { clip: Clip }) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
	const [isMuted, setIsMuted] = useState<boolean>(false);

	const onPlay = () => {
		const videoEl = videoRef.current;
		if (videoEl) {
			videoEl.play();
			setIsPlaying(true);
			window.scrollTo(0, document.body.scrollHeight);
		}
	};

	const onPause = () => {
		const videoEl = videoRef.current;
		if (videoEl) {
			videoEl.pause();
			setIsPlaying(false);
		}
	};

	const onMute = () => {
		const videoEl = videoRef.current;
		if (!videoEl) return;

		setIsMuted(true);
		videoEl.muted = true;
	};

	const onUnmute = () => {
		const videoEl = videoRef.current;
		if (!videoEl) return;

		setIsMuted(false);
		videoEl.muted = false;
	};

	const onPlayAgain = () => {
		const videoEl = videoRef.current;
		if (!videoEl) return;

		videoEl.currentTime = 0;
		videoEl.play();
		setIsPlaying(true);
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
					if (isPlaying) {
						onPause();
					} else {
						onPlay();
					}
				})
				.with('m', () => (isMuted ? onUnmute() : onMute()))
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
		<div className="flex w-11/12 flex-col rounded-3xl bg-slate-900 px-6 pt-4 md:max-w-screen-md 2xl:max-w-screen-lg 2xl:px-8 2xl:pt-8">
			<SectionText>Never gonna to unsee this</SectionText>
			<p className={clsx('pb-1 text-3xl text-white 2xl:pb-4 2xl:text-5xl', berkshire.className)}>
				{clip.name}
			</p>
			<p className="text-l pb-2 text-white 2xl:pb-3 2xl:text-xl">
				{toClipDateFormat(clip.createdAt)}
			</p>
			<div className="grid">
				<div className="relative w-full pt-[56.25%]">
					<video
						controls={false}
						aria-label="Video player"
						poster={clip.thumbnail}
						ref={videoRef}
						className="absolute left-0 top-0 h-full w-full object-cover"
						onEnded={() => setIsPlaying(false)}
						onClick={isPlaying ? onPause : onPlay}
					>
						<source key={clip.id} src={clip.videoUrl} />
						Your browser does not support the video tag.
					</video>
				</div>
				<ScrubBar videoRef={videoRef} />
			</div>

			<div className="flex w-full items-center justify-center gap-6 py-8">
				<IconButton size="xs" onClick={onPlayAgain} Icon={IconArrowPlayAgain} />
				<IconButton onClick={onSeekBackward} Icon={IconArrowBackward} />
				<IconButton
					size="m"
					onClick={isPlaying ? onPause : onPlay}
					Icon={isPlaying ? IconPause : IconPlay}
				/>
				<IconButton onClick={onSeekForward} Icon={IconArrowForward} />
				<IconButton
					size="xs"
					onClick={isMuted ? onUnmute : onMute}
					Icon={isMuted ? IconMuted : IconUnmuted}
				/>
			</div>
		</div>
	);
};
