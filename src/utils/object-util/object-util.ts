export const ObjectUTIL = {
	map: <T extends Any_Object, R>(object: T, cb: <K extends keyof T>(key: K, value: T[K], index: number) => R) => {
		return (Object.keys(object) as (keyof T)[]).map((key, index) => cb(key, object[key], index));
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

	toArray<T extends Any_Object, K extends string = 'key', V extends string = 'value'>(
		object: T,
		nameForKey?: Not_Empty_Str<K>,
		nameForValue?: Not_Empty_Str<V>,
	) {
		const keyName = nameForKey || 'key';
		const valueName = nameForValue || 'value';

		// TODO : Specif keys in the type object[] output

		return ObjectUTIL.map(object, (key, item, i) => {
			return { [keyName]: key, [valueName]: item };
		});
	},
} as const;
