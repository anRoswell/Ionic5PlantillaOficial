const Connection = require('tedious').Connection
require('dotenv').config()

const config = {
	server: process.env.TEDIOUS_HOST_SQLSERVER,
	options: {
		trustServerCertificate: true,
	},
	authentication: {
		type: 'default',
		options: {
			userName: process.env.TEDIOUS_USERNAME_SQLSERVER,
			password: process.env.TEDIOUS_PASSWORD_SQLSERVER,
		},
	},
	option: {
		debug: {
			packet: true,
			data: true,
			payload: true,
			token: false,
			log: true,
		},
		database: process.env.TEDIOUS_DATABASE_SQLSERVER,
		encrypt: false, // for Azure users
	},
}

const pool = new Connection(config)

// Attempt to connect and execute queries if connection goes through
pool.on('connect', (err) => {
	if (err) {
		console.log(err)
	} else {
		console.log('Connected a SqlServer por tedious!!!')
	}
})

pool.on('infoMessage', (message) => {
	console.log(message)
})

pool.on('errorMessage', (message) => {
	console.log(message)
})

pool.on('error', (message) => {
	console.log(message)
})

pool.on('end', (message) => {
	console.log(message)
	process.exit(0)
})

pool.on('debug', (message) => {
	console.log(message)
})

module.exports = pool
