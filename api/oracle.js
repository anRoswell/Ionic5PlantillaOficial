const dao = require('./db/oraclePoolOk')

async function dostuff(ctaContrato = '90017123') {
	const sql = `SELECT s.codigo
									FROM susc s
									WHERE s.cnsctvoea.j = 30
									AND s.codigo = s.codigo_ppal
									AND s.nucuaseo = '${ctaContrato}'`
	const result = await dao.open(sql)
	if (result) {
		console.log(`if`)
		console.log(result)
		console.log(result.rows[0].CODIGO)
		console.log(result.metaData[0].name)
	} else {
		console.log(`else`)
		console.log(result)
	}
}

dostuff()
