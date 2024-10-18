import { CookieUTIL} from '@utils';

export const Home = () => {
	let test = CookieUTIL.getAllCookies();
	console.log(test);

	return (
		<>
			<div>Test CookieUTIL.getAllCookies</div>
		</>
	);
};

export default Home;
