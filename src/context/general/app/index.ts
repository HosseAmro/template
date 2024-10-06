import { createContext } from '../../create-context';

export type Init_State = {
	theme: '' | 'light' | 'dark';
	language: '' | 'fa' | 'en';

	// arry1: [string, number, boolean];
	// arry2: (string | number | boolean)[];
	// arry3: {
	// 	name: string;
	// 	age: number;
	// 	is?: boolean;
	// }[];

	// obj0?: {
	// 	obj1?: {
	// 		// obj2?: {
	// 		// 	obj3?: {
	// 		// 		test?: string | number;
	// 		// 	};
	// 		// };
	// 	};
	// };

	// test?: String | Number;

	// unknown: unknown;
	// any: any;

	// RegExp: RegExp;
	// Error: Error;
	// Date: Date;
};

export const initState: Init_State = {
	language: '',
	theme: '',
};

export const { useContext, Provider } = createContext<Init_State>(initState);

export * from './actions';
