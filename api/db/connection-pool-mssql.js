require('dotenv').config()
const sql = require('mssql')

const config = {
	user: process.env.MSSQL_USERNAME_SQLSERVER,
	password: process.env.MSSQL_PASSWORD_SQLSERVER,
	server: process.env.MSSQL_HOST_SQLSERVER, // You can use 'localhost\\instance' to connect to named instance
	database: process.env.MSSQL_DATABASE_SQLSERVER,
}

// run a query against the global connection pool
function createPool() {
	// async/await style:
	const pool = new sql.ConnectionPool(config)
	return pool.connect()
}

module.exports = {
	createPool,
}
