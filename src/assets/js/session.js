let Ls = window.sessionStorage
export const Lstorage = {
	getItem(key) {
		try {
			return JSON.parse(Ls.getItem(key))
		} catch (err) {
			return null;
		}
	},
	setItem: (key, val) => {
		Ls.setItem(key, JSON.stringify(val))
	},
}
