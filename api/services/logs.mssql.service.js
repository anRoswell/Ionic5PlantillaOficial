const Queries = require('./../db/queries')

const getById = async (userId) => {
	const query = `
    SELECT l.cuentaId, c.cuentaContrato, l.observacion, l.idAccion, l.createdAt
		FROM [dbo].[logs] l
		INNER JOIN [dbo].ccontratos c ON l.cuentaId = c.id
		WHERE l.userId = ${userId}
		ORDER BY l.id DESC
    `
	return await Queries.query(query)
}

module.exports = {
	getById,
}
