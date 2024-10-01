import { Clip } from '@/types/clip';

import { sortByCreatedAt, sortByName } from './clips.helpers';

describe('clips.helpers', () => {
	const clips: Clip[] = [
		{ createdAt: '2021-12-10T10:00:00Z', id: '1', name: 'Clip A', thumbnail: '', videoUrl: '' },
		{ createdAt: '2021-04-10T10:00:00Z', id: '2', name: 'Clip B', thumbnail: '', videoUrl: '' },
		{ createdAt: '2021-08-26T00:00:00Z', id: '3', name: 'Clip C', thumbnail: '', videoUrl: '' },
	];

	describe('sortByCreatedAt (date)', () => {
		it('sorts clips by createdAt in ascending order', () => {
			const sortedClips = sortByCreatedAt(clips, 'asc');
			expect(sortedClips[0].id).toBe('2');
			expect(sortedClips[1].id).toBe('3');
			expect(sortedClips[2].id).toBe('1');
		});

		it('sorts clips by createdAt in descending order', () => {
			const sortedClips = sortByCreatedAt(clips, 'desc');
			expect(sortedClips[0].id).toBe('1');
			expect(sortedClips[1].id).toBe('3');
			expect(sortedClips[2].id).toBe('2');
		});
	});

	describe('sortByName', () => {
		it('sorts clips by name in ascending order', () => {
			const sortedClips = sortByName(clips, 'asc');
			expect(sortedClips[0].name).toBe('Clip A');
			expect(sortedClips[1].name).toBe('Clip B');
			expect(sortedClips[2].name).toBe('Clip C');
		});

		it('sorts clips by name in descending order', () => {
			const sortedClips = sortByName(clips, 'desc');
			expect(sortedClips[0].name).toBe('Clip C');
			expect(sortedClips[1].name).toBe('Clip B');
			expect(sortedClips[2].name).toBe('Clip A');
		});
	});
});
