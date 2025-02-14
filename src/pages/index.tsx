import { TryCatchUTIL } from '@utils';

export const Home = () => {
	function add(a: number, b: number) {
		return a + b;
	}

	const result = TryCatchUTIL.try(add, [10, 5], console.error);
	console.log('result', result);

	return (
		<>
			<div>Test TryCatchUTIL</div>
		</>
	);
};

export default Home;
