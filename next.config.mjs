/** @type {import('next').NextConfig} */

const nextConfig = {
	// Next Config
	output: 'export',
	reactStrictMode: true,
	optimizeFonts: false,
	trailingSlash: true,
	// Module Config
	typescript: {
		// ignoreBuildErrors: true, //Dangerus
	},
	eslint: {
		dirs: ['.'],
	},
	// Environment
	env: {},
};

export default nextConfig;
