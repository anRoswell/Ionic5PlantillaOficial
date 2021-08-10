require('dotenv').config()

module.exports = {
	sequelize: {
		username: process.env.SEQUELIZE_USERNAME_DEV,
		password: process.env.SEQUELIZE_PASSWORD_DEV,
		database: process.env.SEQUELIZE_DATABASE_DEV,
		host: process.env.SEQUELIZE_HOST_DEV,
		dialect: 'mssql',
		logging: (msg) => console.log(msg),
	},

	// Seed database on startup
	seedDB: false,
}
