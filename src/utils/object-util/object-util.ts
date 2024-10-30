export const ObjectUTIL = {
	//------------------------------ map ------------------------------//
	map: <T extends Any_Object, K extends keyof T, R>(
		//
		object: T,
		cb: (key: keyof T, value: T[K], index: number) => R,
	) => {
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
		if (scope === null) {
			return {
				...state,
				...payload,
			};
		}

		const keys = scope.split('.');

		const update = (obj: unknown, keys: string[], value: unknown) => {
			if (!obj || typeof obj !== 'object' || keys.length === 0) return value;

			const [firstKey, ...restKeys] = keys;

			if (obj[firstKey] === undefined) {
				return {
					...obj,
					[firstKey]: update({}, restKeys, value),
				};
			}

			return {
				...obj,
				[firstKey]: update(obj[firstKey], restKeys, value),
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
		if (!object || typeof object !== 'object') return;

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
