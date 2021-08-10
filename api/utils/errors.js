const Response = require('./response')

function errors(err, req, res, next) {
	console.log(err)
	const message = err.message || 'Error interno'
	const status = err.statusCode || 500

	Response.error(req, res, message, status)
}

module.exports = errors
