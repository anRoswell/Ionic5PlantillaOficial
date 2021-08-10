require('dotenv').config()

const lng = process.env.LANG
const i18n = require(`./i18n/es.json`)

const Message = (msg) => ({
	type: i18n[msg]['TYPE'],
	message: i18n[msg]['MSG'],
})

module.exports = Message
