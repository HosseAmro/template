import React, { useState } from 'react';

import { ObjectUTIL } from '@utils';

export const createContext: <T>(initState: T) => {
	Provider: ({ children }) => React.JSX.Element;

	useContext: () => {
		overWrite: <P extends Paths<Deep_Required<T>> | null>( //
			scope: P,
			payload: Deep_Partial<Part_Type<Deep_Required<T>, P>>,
		) => void;
		setState: React.Dispatch<React.SetStateAction<T>>;
		initState: T;
		state: T;
	};
} = (initState) => {
	type T = typeof initState;

	type Context = {
		setState: React.Dispatch<React.SetStateAction<T>>;
		state: T;
	};

	const context = React.createContext<Context>({ setState: () => {}, state: initState });

	const Provider = ({ children }) => {
		const [state, setState] = useState<T>(() => initState);

		return <context.Provider value={{ setState, state }}>{children}</context.Provider>;
	};

	const useContext = () => {
		const { setState, state } = React.useContext(context);
		const overWrite = <P extends Paths<Deep_Required<T>> | null>( //
			scope: P,
			payload: Deep_Partial<Part_Type<Deep_Required<T>, P>>,
		) => {
			setState((oldState) => {
				return ObjectUTIL.overWrite(oldState, scope, payload);
			});
		};
		return { overWrite, setState, initState, state };
	};

	return { useContext, Provider };
};
