const httpStatus = require('http-status-codes')

const success = (req, res, message = '', status = httpStatus.OK, action = '') => {
	res.status(status).send({
		error: false,
		status: status,
		body: message,
		action,
	})
}

const error = (req, res, message = 'Internal server error', status = httpStatus.INTERNAL_SERVER_ERROR, action = '') => {
	console.log(message)
	console.log(status)
	res.status(status).send({
		error: false,
		status: status,
		body: message,
		action,
	})
}

module.exports = {
	success,
	error,
}
