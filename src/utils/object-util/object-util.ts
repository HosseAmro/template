export const ObjectUTIL = {
	map: <T extends Any_Object, K extends keyof T, R>(object: T, cb: (key: keyof T, value: T[K], index: number) => R) => {
		return (Object.entries(object) as [keyof T, T[K]][]).map(([key, value], index) => {
			return cb(key, value, index);
		});
	},

	overWrite: <T, P extends Paths<T> | null>(
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

		let keys: string[] = [];

		if (typeof scope === 'string') {
			keys = scope.split('.');
		}

		const update = (obj: unknown, keys: string[], value: unknown, start: boolean = false) => {
			if (keys.length === 0) return value;

			const [firstKey, ...restKeys] = keys;

			if ([...restKeys].length === 0 && !start) {
				if (obj === undefined || obj === null) {
					return {
						[firstKey]: update({ firstKey }, restKeys, value),
					};
				}
				return {
					[firstKey]: update(obj[firstKey], restKeys, value),
				};
			}
			if (obj === undefined || obj === null) {
				return {
					[firstKey]: update({ firstKey }, restKeys, value),
				};
			}
			return {
				...obj,
				[firstKey]: update(obj[firstKey], restKeys, value),
			};
		};

		return update(state, keys, payload, true);
	},

	toArray: <T extends Any_Object, K extends string = 'key', V extends string = 'value'>(
		object: T,
		nameForKey?: Not_Empty_Str<K>,
		nameForValue?: Not_Empty_Str<V>,
	) => {
		if (object === undefined || object === null) return;

		const keyName = (nameForKey || 'key') as K;
		const valueName = (nameForValue || 'value') as V;

		type Output<T, K extends string, V extends string, A extends keyof T> = {
			[P in K]: A;
		} & {
			[Q in V]: T[A];
		};

		return ObjectUTIL.map(object, (key, value) => {
			return { [keyName]: key, [valueName]: value } as Output<T, K, V, typeof key>;
		});
	},
} as const;
