import { Clip } from '@/types/clip';

export const sortByCreatedAt = (clips: Clip[], order: string | null) =>
	[...clips].sort((a, b) => {
		const dateA = new Date(a.createdAt).getTime();
		const dateB = new Date(b.createdAt).getTime();

		if (order === 'asc') {
			return dateA - dateB;
		}

		return dateB - dateA;
	});

export const sortByName = (clips: Clip[], order: string | null) =>
	[...clips].sort((a, b) => {
		if (order === 'asc') {
			return a.name.localeCompare(b.name);
		}

		return b.name.localeCompare(a.name);
	});
