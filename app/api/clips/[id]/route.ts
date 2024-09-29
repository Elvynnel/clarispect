import { NextRequest, NextResponse } from 'next/server';

import { clips } from '@/app/api/clips/route';

export async function GET(_: NextRequest, { params: { id } }: { params: { id: string } }) {
	if (!id) {
		return NextResponse.json({ error: 'ID is required' }, { status: 400 });
	}

	const clip = clips.find((clip) => clip.id === id);

	if (!clip) {
		return NextResponse.json({ error: 'Clip not found' }, { status: 404 });
	}

	return NextResponse.json(clip);
}
