'use strict'
/**
 * @name SaldoCtaContrato
 * @type function
 * @description Función encargada de realizar la consulta con Sequelize
 * @author Alfonso Navarro <alfonso.navarron@syspotec.com>
 */

const dao = require('../db/oraclePoolOk')
const mensajes = require('../utils/messages/message')
const log4js = require('../utils/log4js')()

const getSaldo = async (ctaContrato) => {
	const sql = `SELECT devsaldo_cartera('${ctaContrato}', 30) FROM dual`
	const resultado = await dao.open(sql)
	// console.log(resultado)
	// console.log(typeof resultado)
	// console.log(Object.getOwnPropertyNames(resultado))

	// console.log(resultado.hasOwnProperty('rows'))

	if (!resultado.hasOwnProperty('rows')) {
		// log4js.error(`[action: ReportarPago.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('DB_CONNECTION_ERROR').message)
	} else {
		return resultado.rows
	}
}

const validarCtaContrato = async (ctaContrato) => {
	const sql = `SELECT COUNT(s.codigo) as validarCtaContrato
								FROM susc s
								WHERE s.cnsctvoea = 30
								AND s.codigo = s.codigo_ppal
								AND s.nucuaseo = '${ctaContrato}'`
	const resultado = await dao.open(sql)

	if (!resultado.hasOwnProperty('rows')) {
		// log4js.error(`[action: ReportarPago.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('DB_CONNECTION_ERROR').message)
	} else {
		return resultado.rows
	}
}

const getCuentaContrato = async (codigo_ppal) => {
	try {
		const sql = `SELECT s.codigo_ppal, s.nombres, s.direnvio, s.estrcodi, 
							pkrangaseo.fsbGetDescr(pksuscaseo.fnuGetRancodi(s.codigo_ppal, s.cnsctvoea), null)  as tipo, 
							a.volubasu,	s.ciclcodi, a.frecbarr, a.frecreco, p.direccion, s.telefono,
							SUM(s.unidhabi) ur,
							SUM(s.unidnohabi) unr,
							${codigo_ppal} as cuentaContrato
							FROM susc s, suscaseo a, predios p
							WHERE s.cnsctvoea = 30
							AND a.cnsctvoea = s.cnsctvoea
							AND p.cnsctvoea = a.cnsctvoea
							AND s.codigo = a.susccodi
							AND s.codigo = p.codigo
							AND s.codigo_ppal = '${codigo_ppal}'
							GROUP BY 
								s.codigo_ppal, s.nombres, s.direnvio, s.estrcodi, 
								pkrangaseo.fsbGetDescr(pksuscaseo.fnuGetRancodi(s.codigo_ppal, s.cnsctvoea), null), 
								a.volubasu,	s.ciclcodi,a.frecbarr, a.frecreco, p.direccion, s.telefono`
		return await dao.open(sql)
	} catch (e) {
		console.log(e)
		log4js.error(`[action: SaldoCtaContrato.service][msg: ${e.message}][file:${__filename}]`)
		throw new Error(mensajes('DB_CONNECTION_ERROR').message)
	}
}

module.exports = {
	getSaldo,
	getCuentaContrato,
	validarCtaContrato,
}
