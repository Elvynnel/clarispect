import { toClipDateFormat } from '@/helpers/date/date.helpers';

describe('date helpers', () => {
	describe('toClipDateFormat', () => {
		it('returns a formatted date string', () => {
			expect(toClipDateFormat('2021-08-25T00:00:00Z')).toBe('25.08.2021');
		});

		it('handles invalid date strings gracefully', () => {
			expect(toClipDateFormat('invalid-date')).toBe('Invalid Date');
		});
	});
});
