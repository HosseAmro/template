export const objectUtil = {
	overWrite: <T, P extends Paths<Deep_Required<T>> | null>(
		//
		state: T,
		scope: P,
		payload: Deep_Partial<Part_Type<Deep_Required<T>, P>>,
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
} as const;
