import { getLeadingBufferedTime } from '@/components/molecules/ScrubBar/ScrubBar.helpers';

describe('getLeadingBufferedTime', () => {
	const createMockTimeRanges = (ranges: [number, number][]): TimeRanges => ({
		end: (index: number) => ranges[index][1],
		length: ranges.length,
		start: (index: number) => ranges[index][0],
	});

	const mockBufferedTimeRanges = createMockTimeRanges([
		[0, 10],
		[20, 30],
	]);

	it('returns the correct buffered time when currentTime is within a range', () => {
		expect(getLeadingBufferedTime(mockBufferedTimeRanges, 5)).toEqual(5);
	});

	it('returns the correct buffered time when currentTime is at the start of a range', () => {
		expect(getLeadingBufferedTime(mockBufferedTimeRanges, 20)).toEqual(10);
	});

	it('returns the correct buffered time when currentTime is at the end of a range', () => {
		expect(getLeadingBufferedTime(mockBufferedTimeRanges, 30)).toEqual(0);
	});

	it('returns null when currentTime is not within any range', () => {
		expect(getLeadingBufferedTime(mockBufferedTimeRanges, 15)).toBeNull();
	});

	it('returns null when currentTime is less than the first range', () => {
		expect(getLeadingBufferedTime(mockBufferedTimeRanges, -1)).toBeNull();
	});

	it('returns null when currentTime is greater than the last range', () => {
		expect(getLeadingBufferedTime(mockBufferedTimeRanges, 40)).toBeNull();
	});
});
