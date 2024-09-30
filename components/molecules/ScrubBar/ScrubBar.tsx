import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { getLeadingBufferedTime } from '@/components/molecules/ScrubBar/ScrubBar.helpers';

export const ScrubBar = ({ videoRef }: { videoRef: MutableRefObject<HTMLVideoElement | null> }) => {
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [duration, setDuration] = useState<number>(0);
	const scrubBarRef = useRef<HTMLDivElement | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const onScrubBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (scrubBarRef.current) {
			const rect = scrubBarRef.current.getBoundingClientRect();
			const percentage = (e.clientX - rect.left) / rect.width;
			const newTime = percentage * duration;

			setCurrentTime(newTime);

			if (videoRef.current) videoRef.current.currentTime = newTime;
		}
	};

	const onMouseDown = () => {
		setIsDragging(true);
	};

	const onMouseDrag = (e: MouseEvent) => {
		if (scrubBarRef.current && isDragging) {
			const rect = scrubBarRef.current.getBoundingClientRect();

			const percentage = (e.clientX - rect.left) / rect.width;
			const newTime = percentage * duration;
			setCurrentTime(newTime);

			if (videoRef.current) videoRef.current.currentTime = newTime;
		}
	};

	const onMouseUp = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		//TODO: Optimize (do not rerender on every timeupdate)?
		if (videoRef.current && !isDragging) {
			const videoEl = videoRef.current;

			const handleTimeUpdate = () => {
				setCurrentTime(videoEl.currentTime);

				if (!duration) setDuration(videoEl.duration);
			};

			videoEl.addEventListener('timeupdate', handleTimeUpdate);

			return () => {
				videoEl.removeEventListener('timeupdate', handleTimeUpdate);
			};
		}
	}, []);

	useEffect(() => {
		window.addEventListener('mousemove', onMouseDrag);
		window.addEventListener('mouseup', onMouseUp);

		return () => {
			window.removeEventListener('mousemove', onMouseDrag);
			window.removeEventListener('mouseup', onMouseUp);
		};
	}, [isDragging]);

	if (!videoRef.current?.played) return null;

	const bufferedTime = getLeadingBufferedTime(videoRef.current.buffered, currentTime);

	return (
		<>
			<div
				className="flex h-[8px] w-full cursor-pointer bg-slate-400"
				ref={scrubBarRef}
				onClick={onScrubBarClick}
				onMouseDown={onMouseDown}
			>
				<div
					className="h-full bg-teal-900"
					style={{
						width: currentTime !== 0 ? `${(currentTime / duration) * 100}%` : '0%',
					}}
				/>
				<div
					className="h-full bg-teal-500"
					style={{
						width: currentTime !== 0 && bufferedTime ? `${(bufferedTime / duration) * 100}%` : '0%',
					}}
				/>
			</div>
			{/* TODO: Display time in another place? */}
			<div>
				{Math.round(currentTime)}/{Math.round(duration)}
			</div>
		</>
	);
};
