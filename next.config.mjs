/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'upload.wikimedia.org',
				pathname: '/**',
				port: '',
				protocol: 'https',
			},
			{
				hostname: 'picsum.photos',
				pathname: '/**',
				port: '',
				protocol: 'https',
			},
			{
				hostname: 'i.ytimg.com',
				pathname: '/**',
				port: '',
				protocol: 'https',
			},
			{
				hostname: 'img.jakpost.net',
				pathname: '/**',
				port: '',
				protocol: 'https',
			},
		],
	},
};

export default nextConfig;
