export const ObjectUTIL = {
	//------------------------------ map ------------------------------//
	map: <T extends Any_Object, K extends keyof T, R>(
		//
		obj: T,
		cb: (key: keyof T, value: T[K], index: number) => R,
	) => {
		let object = obj;
		if (!object || typeof object !== 'object') object = {} as T;

		return (Object.entries(object) as [keyof T, T[K]][]).map(([key, value], index) => {
			return cb(key, value, index);
		});
	},

	//------------------------------ overWrite ------------------------------//
	overWrite: <T extends Any_Object, P extends Paths<T> | null>(
		//
		state: T,
		scope: P,
		payload: Deep_Partial<Part_Type<T, P>>,
	): T => {
		if (!state || typeof state !== 'object') return {} as T;

		if (scope === null) {
			if (!payload || typeof payload !== 'object') return state;

			return {
				...state,
				...payload,
			};
		}

		const keys = scope.split('.');

		const update = (obj: unknown, keys: string[], value: unknown) => {
			if (!obj || typeof obj !== 'object' || keys.length === 0) return value;

			const [firstKey, ...restKeys] = keys;

			return {
				...obj,
				[firstKey]: update(obj[firstKey] || {}, restKeys, value),
			};
		};

		return update(state, keys, payload) as T;
	},

	//------------------------------ toArray ------------------------------//
	toArray: <T extends Any_Object, Key extends string = 'key', Value extends string = 'value'>(
		//
		object: T,
		nameForKey?: Not_Empty_Str<Key>,
		nameForValue?: Not_Empty_Str<Value>,
	) => {
		const keyName = (nameForKey || 'key') as Key;
		const valueName = (nameForValue || 'value') as Value;

		return ObjectUTIL.map(object, (key, value) => {
			return {
				[keyName]: key,
				[valueName]: value,
			} as {
				[K in Key]: string | number | symbol;
			} & {
				[V in Value]: unknown;
			};
		});
	},
} as const;
