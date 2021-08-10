require('dotenv').config()

const DEVELOPMENT = require('./development')
const PRODUCTION = require('./production')
const QA = require('./qa')

const { NODE_ENV } = process.env

let currentEnv = DEVELOPMENT

if (NODE_ENV === 'production') {
	currentEnv = PRODUCTION
} else if (NODE_ENV === 'qa') {
	currentEnv = QA
}

module.exports = currentEnv
