// const seq = require('../../services/users')
// const DB = require('../../db/db')
// const db = new DB('users')
const jwt = require('../middlewares/jwt')
const bcrypt = require('bcrypt')
const mail = require('./../../utils/email/email')

const userMobileSqlServer = require('./../../services/user.mssql.service')

const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

module.exports = function () {
	return {
		getByIdmb: async (req, res) => {
			try {
				const {
					params: { id },
				} = req
				const result = await userMobileSqlServer.countOne(id)
				if (result === null) {
					throw Response.error(req, res, 'No se encontraron registros de usuarios', 400)
				} else {
					return result
				}
			} catch (e) {
				log4js.error(`[action: stickerOpciones updateAdminMsSql controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 500)
			}
		},
		createmb: async (req, res) => {
			try {
				const data = req.body
				data.usrPassword = bcrypt.hashSync(data.usrPassword, 10)
				await userMobileSqlServer.create(data)
				delete data['usrPassword']
				return data.recordset
			} catch (e) {
				console.log(e)
				log4js.error(`[action: stickerOpciones updateAdminMsSql controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 500)
			}
		},
		mailmb: async (req, res) => {
			try {
				return mail.sendEmail(req.body)
			} catch (e) {
				log4js.error(`[action: stickerOpciones updateAdminMsSql controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 500)
			}
		},
		putUsermb: async (req, res) => {
			try {
				const {
					params: { id },
				} = req
				const user = await userMobileSqlServer.countOne(id)
				console.log(user[0])
				if (!user) {
					throw Response.error(req, res, 'No se encontró ningún registro con ese ID', 400)
				} else {
					// user.usr_password = bcrypt.hashSync(user.usr_password, 10)
					await userMobileSqlServer.update(id, user[0])
					return 'Datos actualizados correctamente.'
				}
			} catch (e) {
				log4js.error(`[action: stickerOpciones updateUser controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 500)
			}
		},
		updatePassUsermb: async (req, res) => {
			try {
				const {
					params: { id },
				} = req
				const user = await userMobileSqlServer.countOne(id)
				if (!user) {
					throw Response.error(req, res, 'No se encontró ningún registro con ese ID', 400)
				} else {
					// throw Response.error(req, res, 'Error provocado')
					const newPassword = bcrypt.hashSync(req.body.usrPassword, 10)
					await userMobileSqlServer.updatePass(id, newPassword)
					return 'Datos actualizados correctamente.'
				}
			} catch (e) {
				console.log(e)
				log4js.error(`[action: updatePassUsermb controller][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Server error interno', 500)
			}
		},
	}
}
