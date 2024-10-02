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

	if (!videoRef.current?.played) return <div className="h-[6px] w-full" />;

	const bufferedTime = getLeadingBufferedTime(videoRef.current.buffered, currentTime);

	return (
		<div
			className="flex h-[6px] w-full cursor-pointer bg-orange-100"
			ref={scrubBarRef}
			onClick={onScrubBarClick}
			onMouseDown={onMouseDown}
		>
			<div
				className="relative h-full bg-orange-500"
				style={{
					width: currentTime !== 0 ? `${(currentTime / duration) * 100}%` : '0%',
				}}
			>
				<div className="absolute -right-2 -top-[5px] h-4 w-4 rounded-full border-[1px] border-orange-300 bg-orange-500"></div>
				{isDragging && (
					<div className="absolute -right-6 -top-[34px] flex w-12 select-none items-center justify-center rounded-l-full rounded-r-full bg-orange-50">
						<p>
							{currentTime >= 0 ? Math.round(currentTime) : 0}
							<span className="text-xs">s</span>
						</p>
					</div>
				)}
			</div>
			<div
				className="h-full bg-orange-300"
				style={{
					width: currentTime !== 0 && bufferedTime ? `${(bufferedTime / duration) * 100}%` : '0%',
				}}
			/>
		</div>
	);
};
