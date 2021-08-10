require('dotenv').config()

module.exports = {
	sequelize: {
		username: process.env.SEQUELIZE_USERNAME || 'username',
		password: process.env.SEQUELIZE_PASSWORD || 'password',
		database: process.env.SEQUELIZE_DATABASE || 'database',
		host: process.env.SEQUELIZE_HOST || 'host',
		dialect: 'mssql',
		operatorsAliases: false,
		logging: (msg) => winston.info(msg),
	},

	// Seed database on startup
	seedDB: true,
}
