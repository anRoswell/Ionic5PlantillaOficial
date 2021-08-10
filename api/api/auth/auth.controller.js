const bcrypt = require('bcrypt')
// mssql
const authMobile = require('./../../services/auth.mssql.service')
const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()
const Queries = require('./../../db/queries')

const jwt = require('./../middlewares/jwt')
const email = require('../../utils/email/email')

const firebase = require('./../../utils/firebase')

module.exports = function () {
	return {
		authAdminMsSql: async (req, res) => {
			try {
				const data = req.body
				const ip = req.ip

				const { usrEmail, usrPassword } = data
				const user = await authMobile.findOne(usrEmail)
				if (!user) {
					// throw new Error('Datos de acceso incorrectos: Usuario')
					throw Response.error(req, res, 'Datos de acceso incorrectos: Usuario', 400)
				} else {
					const validatePassword = bcrypt.compareSync(usrPassword, user.recordset[0].usrPassword)

					if (!validatePassword) {
						throw Response.error(req, res, 'Datos de acceso incorrectos: Password', 400)
					} else {
						await Queries.lastLogin(user.recordset[0].id, ip)
						const token = jwt.create(user.recordset[0])
						res.setHeader('Authorization', `Bearer ${token}`)

						// Aqui obtenemos el menu
						const options = await Queries.menus(user.recordset[0].profileId)
						const menus = options.recordset.filter((o) => !o.menuId)
						menus.map((m) => {
							m.menus = options.recordset.filter((o) => m.id === o.menuId)
						})
						const buffer = Buffer.from(JSON.stringify(menus), 'utf8')
						user.recordset[0].access = buffer.toString('base64')

						delete user.recordset[0].usrPassword
						return user.recordset[0]
					}
				}
			} catch (e) {
				console.log(e)
				log4js.error(`[action: authAdminMsSql][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Error interno en el servidor', 500)
			}
		},
		authMobile: async (req, res) => {
			try {
				// const tokenFirebase =
				// 	'fSEL-4haSZm1RGp1yUqJ45:APA91bFr-eNjHJdYMkmhpUGXRFZ9KLLJqEVlLtZmP1hkkaRPuviAel5SezjymDYXFcaxM1kLiWlNgy9ZpKkapyZhpkHo6w88GtKOXttRVgafqC70XWrj3o88vSWGDq47CoBrdVoBm4wC'
				// firebase.sendMessage(tokenFirebase, { campo1: '1', campo2: '2' })
				console.log(req.body)
				const { usrEmail, usrPassword } = req.body
				const user = await authMobile.findOne(usrEmail)
				if (parseInt(user.rowsAffected, 10) === 0) {
					Response.error(req, res, 'Datos de acceso incorrectos: Usuario', 400)
				} else {
					const validatePassword = bcrypt.compareSync(usrPassword, user.recordset[0].usrPassword)

					if (!validatePassword) {
						Response.error(req, res, 'Datos de acceso incorrectos: Password', 400)
					} else {
						// await authSeq.update(user.id, { last_login: new Date() })
						delete user.recordset[0].usrPassword
						const token = jwt.create(user.recordset[0])
						if (token) {
							res.setHeader('Authorization', `Bearer ${token}`)
						}
						authMobile.update(user.recordset[0].id)
						return user.recordset[0]
					}
				}
			} catch (e) {
				console.log(`El throw lleva aqui`)
				// log4js.error(`[action: authMobileMsSql][msg: ${e.message}][file:${__filename}]`)
				Response.error(req, res, 'Error interno en el servidor', 500)
			}
		},
		recoverypassmb: async (req, res) => {
			try {
				const { emailRecovery } = req.body
				const { recordset } = await authMobile.findOne(emailRecovery)
				if (recordset.length === 0) {
					throw Response.error(req, res, 'Correo no registrado!!!', 404)
				} else {
					const resp = await email.recoverypass(recordset[0])
					return resp
				}
			} catch (e) {
				console.log(e)
				log4js.error(`[action: recoverypassmb][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Error interno en el servidor', 500)
			}
		},
	}
}
