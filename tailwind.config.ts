import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	fontFamily: {
		aboreto: ['var(--font-aboreto)'],
		berkshire: ['var(--font-berkshire)'],
	},
	plugins: [],
	theme: {
		extend: {
			backgroundImage: {
				background: "url('/images/img/background.png')",
			},
		},
	},
};
export default config;
