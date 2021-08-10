const { NETWORK_AUTHENTICATION_REQUIRED } = require('http-status-codes')

const Schema = (schema) => {
	const { allowed, json, required, params } = schema

	return {
		// Encargado de limpiar los datos que no van a ser permitidos en el Controller
		cleaner: (req, res, next) => {
			for (const key in req.body) {
				if (!allowed.includes(key)) {
					delete req.body[key]
				} else {
					if (json && json.includes(key)) {
						req.body[key] = JSON.stringify(req.body[key])
					}
				}
			}
			next()
		},

		validate: (req, res, next) => {
			const errors = []
			const empty = []
			const allEmpty = [null, undefined, '']

			for (const key in required) {
				if (!Object.keys(req.body).includes(key)) {
					errors.push(required[key])
				} else if (allEmpty.includes(req.body[key])) {
					empty.push(required[key])
				}
			}

			const errorMsg = `[faltan campos obligatorios: ${errors.join(', ')}]`
			const emptyMsg = `[existen campos vacíos: ${empty.join(', ')}]`
			const message = `Error: ${errors.length ? errorMsg : ''} ${empty.length ? emptyMsg : ''}`

			if (errors.length || empty.length) {
				// res.status(400).json({ type: 'error', message })
				console.log(message)
				throw new Error(message)
			} else {
				next()
			}
		},
	}
}

module.exports = Schema
