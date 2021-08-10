require('dotenv').config()

const jwt = require('jsonwebtoken')
const moment = require('moment')
const { encrypt, decrypt } = require('simple-encryptor')(process.env.JWT_ENCRYPT)
const log4js = require('./../../utils/log4js')()
const Message = require('../../utils/messages/message')

const JWT = {
	create: (user) => {
		try {
			const { id, usr_username, usr_email, profileId } = user
			const payload = {
				sub: encrypt({ id, usr_username, usr_email, profileId }),
				name: usr_username,
				iat: moment().add(60, 'minutes').unix(),
			}

			return jwt.sign(payload, process.env.JWT_SESSION)
		} catch (error) {
			log4js.error(
				`[action: JWT:create][msg: ${(JSON.stringify(user), JSON.stringify(error.message))}][file: ${__filename}]`,
			)
			return ''
		}
	},
	isAuth: (req, res, next) => {
		try {
			const {
				headers: { authorization },
			} = req
			if (authorization) {
				const token = authorization.split(' ').pop()
				const payload = jwt.verify(token, process.env.JWT_SESSION)
				if (payload) {
					// console.log(payload.iat)
					// console.log(moment().unix())
					// console.log(payload.iat < moment().unix())
					if (payload.iat < moment().unix()) {
						res.status(401).json(Message('AUTH_EXPIRED').message)
					} else {
						const user = decrypt(payload.sub)
						const token = JWT.create(user)
						res.header('Authorization', `Bearer ${token}`)
						log4js.info(`[action: JWT:isAuth][msg: ${JSON.stringify(user)}][file: ${__filename}]`)
						next()
					}
				} else {
					log4js.info(`[action: JWT:isAuth][msg: Petición con payload incorrecto][file: ${__filename}]`)
					res.status(403).json(Message('AUTH_INVALID').message)
				}
			} else {
				log4js.info(`[action: JWT:isAuth][msg: Petición con Token inválido][file: ${__filename}]`)
				res.status(403).json(Message('AUTH_INVALID').message)
			}
		} catch (error) {
			log4js.info(`[action: JWT:isAuth][msg: Error en validación del Token, ${error.message}][file: ${__filename}]`)
			res.status(403).json(Message('AUTH_INVALID'))
		}
	},
}

module.exports = JWT
