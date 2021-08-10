const express = require('express')
const router = express.Router()
const response = require('./../../utils/response')
const Controller = require('./index')

const jwt = require('./../middlewares/jwt')

router.get('/mblogs/:id', (req, res, next) => {
	Controller.getById(req, res)
		.then((lista) => response.success(req, res, lista, 200))
		.catch(next)
})

module.exports = router
