import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {},
		extend: {},
		fontFamily: {
			iransans: 'iransans',
			crea: 'crea',
		},
	},
	plugins: [],
};

export default config;
