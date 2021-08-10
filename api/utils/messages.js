/**
 * Funcionalidad para obtener los mensajes generados en la aplicación
 * @author jaimecastrillon@gmail.com
 */

const Messages = require('./messages/message.json')
const { language } = require('../config')

module.exports = (msg, type = '', title = '', message = '') => {
	const hasMessage = (msg) => msg && Messages[language][msg]
	return {
		type: hasMessage(msg) ? Messages[language][msg]['TYPE'] : type,
		title: hasMessage(msg) ? Messages[language][msg]['TITLE'] : title,
		description: hasMessage(msg) ? Messages[language][msg]['DESCRIPTION'] : message,
	}
}
