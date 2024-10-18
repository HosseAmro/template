export const LocalStorageUTIL = {
	setItem: <T>(name: Not_Empty_Str<T>, value: unknown) => {
		try {
			if (!name || typeof name !== 'string') return;

			localStorage.setItem(name, JSON.stringify(value));
		} catch (error) {}
	},

	getItem: <T>(name: Not_Empty_Str<T>): unknown => {
		try {
			if (!name) return null;

			const item = localStorage.getItem(name);
			if (!item) return null;

			return JSON.parse(item);
		} catch (err) {}
	},

	getAll: (): Storage => {
		return { ...localStorage };
	},

	deleteItem: <T>(name: Not_Empty_Str<T>) => {
		if (!name) return;
		return localStorage.removeItem(name);
	},

	storageListener: (addListenerCb: (e: StorageEvent) => unknown) => {
		window.addEventListener('storage', addListenerCb);

		const removeListener = () => window.removeEventListener('storage', addListenerCb);

		return { removeListener };
	},

	logout: <T>(redirectTo?: Not_Empty_Str<T>) => {
		localStorage.removeItem('token');
		if (redirectTo && typeof redirectTo === 'string') {
			location.replace(redirectTo);
		}
	},
} as const;
