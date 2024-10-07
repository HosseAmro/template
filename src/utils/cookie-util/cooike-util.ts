export const cookieUtil = {
	getAllCookies: (): { name: string; value: unknown }[] => {
		const cookies = (document.cookie || '').split(';') || [];

		const allCookies = cookies.map((str) => {
			const [name, value] = str.split('=');
			let fixedName: string = name;
			let fixedValue: unknown = value;

			try {
				fixedName = decodeURIComponent(name || '');
			} catch (error) {}

			try {
				fixedValue = decodeURIComponent(value || '');
			} catch (e) {}

			try {
				if (typeof fixedValue === 'string') fixedValue = JSON.parse(value || '');
			} catch (e) {}

			return {
				name: fixedName || '',
				value: fixedValue || '',
			};
		});
		return allCookies;
	},
} as const;
