const sqlPool = require('./connection-pool-mssql')

const Message = require('./../utils/messages/message')
const log4js = require('../utils/log4js')()
require('dotenv').config()

const Execute = (sql, params = []) => {
	console.log(sql)
	return new Promise(async (resolve, reject) => {
		try {
			const pool = await sqlPool.createPool()
			const request = pool.request()

			request
				.query(sql)
				.then((result) => {
					// console.log(result)
					resolve(result)
				})
				.catch((err) => {
					console.log(err)
					reject(err)
				})
		} catch (error) {
			console.log(error.message)
			reject(error.message)
		}
	})
}

const ExecuteInyect = (sql, params = []) => {
	console.log(sql)
	console.log(params)
	return new Promise(async (resolve, reject) => {
		try {
			const pool = await sqlPool.createPool()
			const request = pool.request()

			params.map((object) => {
				for (const property in object) request.input(property, object[property])
			})

			request
				.query(sql)
				.then((result) => resolve(result))
				.catch((err) => {
					console.log(err)
					reject(err)
				})
		} catch (error) {
			console.log(error)
			reject(error.message)
		}
	})
}

module.exports = {
	Execute,
	ExecuteInyect,
}
