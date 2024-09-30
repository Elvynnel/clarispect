import { NextResponse } from 'next/server';

import { Clip } from '@/types/clip';

export const clips: Clip[] = [
	{
		createdAt: 'May 9, 2011',
		id: '1',
		name: 'Big Buck Bunny',
		thumbnail:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
		videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
	},
	{
		createdAt: 'May 9, 2011',
		id: '2',
		name: 'The first Blender Open Movie from 2006',
		thumbnail: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
		videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	},
	{
		createdAt: 'May 9, 2011',
		id: '3',
		name: 'For Bigger Blazes',
		thumbnail: 'https://picsum.photos/id/240/200/300',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
	},
	{
		createdAt: 'May 9, 2011',
		id: '4',
		name: 'For Bigger Escape',
		thumbnail: 'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
	},
	{
		createdAt: 'May 9, 2011',
		id: '5',
		name: 'Big Buck Bunny',
		thumbnail:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
		videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
	},
	{
		createdAt: 'May 9, 2011',
		id: '6',
		name: 'For Bigger Blazes',
		thumbnail: 'https://picsum.photos/id/230/200/300',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
	},
	{
		createdAt: 'May 9, 2011',
		id: '7',
		name: 'For Bigger Escape',
		thumbnail: 'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
		videoUrl:
			'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
	},
	{
		createdAt: 'May 9, 2011',
		id: '8',
		name: 'The first Blender Open Movie from 2006',
		thumbnail: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
		videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	},
];

export const GET = async () => NextResponse.json(clips);
