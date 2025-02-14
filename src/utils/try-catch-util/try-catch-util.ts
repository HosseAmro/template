export const TryCatchUTIL = {
	try: <
		//
		T extends (...args: any[]) => Exclude<ReturnType<T>, Promise<any>>,
		E extends new (message?: string) => Error,
	>(
		//
		fn: T,
		data: Parameters<T>,
		onError?: (error: unknown) => void,
		Errors: E[] = [],
	) => {
		try {
			return fn(...data);
		} catch (error: unknown) {
			if (onError) onError(error);

			let message: string;

			if (Errors.length === 0 || Errors.some((e) => error instanceof e)) {
				if (error instanceof Error) {
					message = error.message;
				} else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
					message = error.message;
				} else if (typeof error === 'string') {
					message = error;
				} else {
					message = 'unknown error';
				}

				console.info(message);

				return new Error(message);
			}
			throw error;
		}
	},
} as const;
