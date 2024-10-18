//------------------------------ Internal Packages ------------------------------//
import type { AppProps } from 'next/app';
import { Router } from 'next/router';

//------------------------------ External Packages ------------------------------//
import nprogress from 'nprogress';

//------------------------------ Componnents ------------------------------//
import { AppTemplate } from '@template';

//------------------------------ Styles ------------------------------//
import '@assets/package/app.scss';
import '@assets/style/app.scss';

console.clear();

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	Router.events.on('routeChangeStart', () => nprogress.start());
	Router.events.on('routeChangeComplete', () => nprogress.done());
	Router.events.on('routeChangeError', () => nprogress.done());

	return (
		<>
			<AppTemplate>
				<Component {...pageProps} />
			</AppTemplate>
		</>
	);
};

export default App;
