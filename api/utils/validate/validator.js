const validations = require('./validations.json')

module.exports = (model) => {
	const allowed = validations[model].allowed
	const required = validations[model].required
	return {
		cleanData: (data) => {
			for (const key in data) {
				if (!allowed.includes(key)) {
					delete data[key]
				}
			}
			return data
		},
		isValid: (data) => {
			const errors = []
			for (const key in required) {
				if (!Object.keys(data).includes(key)) {
					errors.push(required[key])
				}
			}
			return !errors.length ? false : `Faltan campos obligatorios: ${errors.join(', ')}`
		},
	}
}
