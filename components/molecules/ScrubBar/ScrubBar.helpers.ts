export const getLeadingBufferedTime = (
	buffered: TimeRanges,
	currentTime: number,
): number | null => {
	for (let i = 0; i < buffered.length; i++) {
		const start = buffered.start(i);
		const end = buffered.end(i);

		if (currentTime >= start && currentTime <= end) {
			return end - currentTime;
		}
	}
	return null;
};
