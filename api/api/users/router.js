const express = require('express')
const router = express.Router()
const Controller = require('./index')
const response = require('../../utils/response')

const jwt = require('../middlewares/jwt')
const schema = require('./../../db/schemas/user.json')
const Schema = require('./../middlewares/schema')(schema)

router
	.get('/mbusers/:id', async (req, res, next) => {
		Controller.getByIdmb(req, res)
			.then((lista) => response.success(req, res, lista, 200))
			.catch(next)
	})
	.post('/mbusers', [Schema.cleaner, Schema.validate], async (req, res, next) => {
		Controller.createmb(req, res)
			.then((lista) => response.success(req, res, lista, 200))
			.catch(next)
	})
	.post('/mbusers/mail', (req, res, next) => {
		Controller.mailmb(req, res)
			.then((codVerificacion) => response.success(req, res, codVerificacion, 200))
			.catch(next)
	})
	.put('/mbusers/:id', async (req, res, next) => {
		Controller.putUsermb(req, res)
			.then((resp) => response.success(req, res, resp, 200))
			.catch(next)
	})
	.put('/passmbusers/:id', async (req, res, next) => {
		Controller.updatePassUsermb(req, res)
			.then((resp) => response.success(req, res, resp, 200))
			.catch(next)
	})

module.exports = router
