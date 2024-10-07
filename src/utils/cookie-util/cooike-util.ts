export const cookieUtil = {
	getAllCookies: (): { name: string; value: string | object }[] => {
		const cookies = (document.cookie || '').split(';') || [];

		const allCookies = cookies.map((str) => {
			const [name, value] = str.split('=');
			let obj: unknown;
			try {
				obj = JSON.parse(decodeURIComponent(value || ''));
			} catch (error) {}

			if (obj && typeof obj === 'object') {
				try {
					return { name: decodeURIComponent(name || ''), value: obj };
				} catch (error) {
					return { name: name || '', value: obj };
				}
			} else {
				try {
					return { name: decodeURIComponent(name || ''), value: decodeURIComponent(value || '') };
				} catch (error) {
					return { name: name || '', value: value || '' };
				}
			}
		});
		return allCookies;
	},
} as const;
