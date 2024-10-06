import { createContext } from '../../create-context';

export type Init_State = {
	token: string | null;
	type: string | null;
};

export const initState: Init_State = {
	type: null,
	token: null,
};

export const { useContext, Provider } = createContext<Init_State>(initState);

export * from './actions';
