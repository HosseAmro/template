import { cookieUtil } from '@utils';

export const Home = () => {
	let test = cookieUtil.getAllCookies();
	console.log(test);

	return (
		<>
			<div>Test cookieUtil getAllCookies</div>
		</>
	);
};

export default Home;
