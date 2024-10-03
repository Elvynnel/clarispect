import Link from 'next/link';

const NotFound = () => (
	<div className="flex w-full flex-col items-center pt-10">
		<div className="space-y-2 rounded-3xl bg-black bg-opacity-50 p-10 text-center md:space-y-6">
			<h1 className="text-xl font-bold text-white md:text-6xl">Page Not Found</h1>
			<p className="mx-auto max-w-2xl font-sans text-sm text-white md:text-2xl">
				Sorry, the page you&apos;re looking for doesn&apos;t exist.
			</p>
			<Link
				href="/"
				className="inline-block rounded-md bg-fuchsia-700 px-8 py-3 text-xs font-bold text-white transition-all duration-300 hover:bg-fuchsia-600 md:text-lg"
			>
				Go Back Home
			</Link>
		</div>
	</div>
);

export default NotFound;
