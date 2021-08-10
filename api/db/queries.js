const Execute = require('./execute')
const mensajes = require('./../utils/messages')
const log4js = require('../utils/log4js')()
var jsonSql = require('json-sql')()

class Queries {
	static create(table, fields, ignore) {
		try {
			const sql = `INSERT ${ignore ? 'IGNORE' : ''} INTO ?? SET ?;`
			return Execute(sql, [table, fields])
		} catch (error) {
			log4js.error(`[action: Queries create][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static createQuery(table, fields, id) {
		const options = {
			dialect: 'mssql',
			type: 'update',
			table: table,
			condition: { id },
			modifier: fields,
		}
		return jsonSql.build(options)
	}

	static update(table, fields, id) {
		try {
			const sql = 'UPDATE ?? SET ? WHERE `id`=?;'
			return Execute(sql)
		} catch (error) {
			log4js.error(`[action: Queries update][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static delete(table, id) {
		try {
			// const sql = 'DELETE FROM ?? WHERE `id`=?;'
			const sql = 'UPDATE ?? SET `status`=0 WHERE `id`=?;'
			return Execute(sql, [table, id])
		} catch (error) {
			log4js.error(`[action: Queries delete][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static one(table, id, fields) {
		try {
			const sql = jsonSql.build({
				type: 'select',
				table: table,
				fields,
				condition: { id },
			})

			console.log(sql.query)

			// const sql = fields ? 'SELECT ?? FROM ?? WHERE `id`=?;' : 'SELECT * FROM ?? WHERE `id`=?;'
			// const params = fields ? [fields, table, id] : [table, id]
			// return Execute(sql, params)
		} catch (error) {
			log4js.error(`[action: Queries one][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static all(table, fields, where, order) {
		try {
			const sql = where ? 'SELECT ?? FROM ?? WHERE ? ORDER BY ??;' : 'SELECT ?? FROM ?? ORDER BY ??;'
			const params = where ? [fields, table, where, order] : [fields, table, order]
			return Execute(sql, params)
		} catch (error) {
			log4js.error(`[action: Queries all][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static in(table, fields, field, values) {}

	static count(table, field, where) {}

	static distinct(table, field, where) {}

	static async auth(username) {
		try {
			const sql = `
        SELECT *
        FROM [dbo].[users]
        WHERE usr_email = '${username}'
      `
			return await Execute(sql)
		} catch (error) {
			log4js.error(`[action: Queries auth][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static lastLogin(id, ip) {
		try {
			// const sql = `UPDATE [dbo].[users] SET lastDateLogin=${new Date()}, lastIpLogin=${ip} WHERE id=${id}`
			const sql = `UPDATE [dbo].[users] SET lastDateLogin=GETDATE() WHERE id=${id}`
			return Execute(sql)
		} catch (error) {
			log4js.error(`[action: Queries lastLogin][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static menus(profileId) {
		try {
			const sql = `
      SELECT
        m.id,
        m.name,
        m.url,
        m.icon,
        m.menuId,
        m.divider
      FROM menus m
      INNER JOIN access a ON m.id = a.menuId
      WHERE m.status = 0 AND a.profileId=${profileId}
      ORDER BY m.menuId, m.[order]`
			return Execute(sql)
		} catch (error) {
			log4js.error(`[action: Queries menus][msg: ${error.message}][file:${__filename}]`)
			throw new Error(mensajes('DB_CONNECTION_ERROR').description)
		}
	}

	static async query(query) {
		return await Execute(query)
	}

	static async queryInject(query, params) {
		return await Execute.ExecuteInyect(query, params)
	}
}

module.exports = Queries
