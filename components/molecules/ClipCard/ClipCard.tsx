import { clsx } from 'clsx';
import Link from 'next/link';

import { Img } from '@/components/atoms/Img/Img';
import { ButtonPlay } from '@/components/molecules/ButtonPlay/ButtonPlay';
import { berkshire } from '@/fonts';
import { toClipDateFormat } from '@/helpers/date/date.helpers';
import { Clip } from '@/types/clip';

interface ClipCardProps {
	clip: Clip;
	href: string;
}

const ClipCardCommonPart = ({ createdAt, name }: { createdAt: string; name: string }) => (
	<>
		<div className="absolute bottom-1/2 left-[calc(50%-30px)]">
			<ButtonPlay />
		</div>
		<div className="absolute bottom-0 h-24 w-full bg-slate-900 opacity-70"></div>
		<div className="absolute bottom-2 flex w-full flex-col gap-2 p-4">
			<h2 className={clsx('text-lg font-semibold text-white', berkshire.className)}>{name}</h2>
			<p className="text-sm text-white">{toClipDateFormat(createdAt)}</p>
		</div>
	</>
);

const ClipCardBase = ({ clip: { createdAt, id, name, thumbnail }, href }: ClipCardProps) => (
	<Link href={href} key={id} className="group relative overflow-hidden rounded-xl">
		<Img
			src={thumbnail}
			alt={name}
			wrapperClassName="relative w-full h-80"
			className="transform object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
			fill
			sizes="33vw"
			priority={false}
		/>
		<ClipCardCommonPart createdAt={createdAt} name={name} />
	</Link>
);

const ClipCardExposed = ({ clip: { createdAt, id, name, thumbnail }, href }: ClipCardProps) => (
	<Link
		href={href}
		key={id}
		className="group flex transform flex-col overflow-hidden rounded-xl bg-slate-800 shadow-md"
	>
		<Img
			src={thumbnail}
			alt={name}
			wrapperClassName="relative w-full h-[420px]"
			className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[102%]"
			priority
			fill
		/>
		<ClipCardCommonPart createdAt={createdAt} name={name} />
	</Link>
);

export const ClipCard = Object.assign(ClipCardBase, { Exposed: ClipCardExposed });
