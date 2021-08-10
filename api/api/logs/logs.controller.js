'use strict'
const logsMobileMsSql = require('./../../services/logs.mssql.service')

const Response = require('./../../utils/response')
const log4js = require('./../../utils/log4js')()

module.exports = function () {
	return {
		getById: async (req, res) => {
			try {
				const {
					params: { id },
				} = req
				const result = await logsMobileMsSql.getById(id)
				if (result.length === 0) {
					throw Response.error(req, res, 'No se encontraron registros de logs', 400)
				} else {
					return result.recordset
				}
			} catch (e) {
				log4js.error(`[action: logs getById][msg: ${e.message}][file:${__filename}]`)
				throw Response.error(req, res, 'Internal Error Server', 500)
			}
		},
	}
}
