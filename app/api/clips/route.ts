import { NextResponse } from 'next/server';

import { sortByCreatedAt, sortByName } from '@/app/api/clips/clips.helpers';
import { Clip } from '@/types/clip';

export const clips: Clip[] = [
	{
		createdAt: '2021-10-10T10:00:00Z',
		id: '1',
		name: 'Sintel',
		thumbnail: 'https://picsum.photos/id/29/1280/546',
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
	},
	{
		createdAt: '2021-11-10T10:00:00Z',
		id: '2',
		name: 'Tears of Steel',
		thumbnail: 'https://picsum.photos/id/495/1280/534',
		videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
	},
	{
		createdAt: '2021-12-10T10:00:00Z',
		id: '3',
		name: 'For Bigger Blazes',
		thumbnail: 'https://picsum.photos/id/525/1280/720',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
	},
	{
		createdAt: '2021-09-10T10:00:00Z',
		id: '4',
		name: 'For Bigger Escape',
		thumbnail: 'https://picsum.photos/id/524/1280/720',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
	},
	{
		createdAt: '2021-10-09T10:00:00Z',
		id: '5',
		name: 'Big Buck Bunny',
		thumbnail:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
		videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
	},
	{
		createdAt: '2021-02-10T10:00:00Z',
		id: '6',
		name: 'For Bigger Blazes',
		thumbnail: 'https://picsum.photos/id/528/1280/720',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
	},
	{
		createdAt: '2021-03-10T10:00:00Z',
		id: '7',
		name: 'For Bigger Escape',
		thumbnail: 'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
	},
	{
		createdAt: '2021-04-10T10:00:00Z',
		id: '8',
		name: 'The first Blender Open Movie from 2006',
		thumbnail: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
		videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	},
];

export const GET = async ({ url }: { url: string }) => {
	const searchParams = new URL(url).searchParams;
	const sortBy = searchParams.get('sortBy');
	const order = searchParams.get('order');

	let _clips = [...clips];

	if (sortBy === 'createdAt') {
		_clips = sortByCreatedAt(clips, order);
	} else if (sortBy === 'name') {
		_clips = sortByName(clips, order);
	}

	return NextResponse.json(_clips);
};
