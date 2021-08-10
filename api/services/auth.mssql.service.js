'use strict'
/**
 * @name Auth
 * @type function
 * @description Función encargada de realizar la consulta con mssql
 * @author Alfonso Navarro <alfonso.navarron@syspotec.com>
 */

const Queries = require('./../db/queries')

const findOne = async (user) => {
	const query = `
      SELECT 
        u.id,
        u.usrEmail,
        u.usrPassword,
        u.usrNames,
        u.usrLastNames,
        u.identificationTypeId,
        u.usrCedula,
        u.usrNroCelular,
        u.usrTelefonoFijo,
        u.usrDireccion,
        profileId
      FROM [dbo].[users] u
      INNER JOIN [dbo].[profiles] p ON u.profileId = p.id
      WHERE usrEmail = '${user}' AND u.usrStatus = 1
    `
	return await Queries.query(query)
}

const update = async (id) => {
	const query = `
    UPDATE [dbo].[users]
    SET lastLogin = GETDATE()
    WHERE id = ${id}
  `
	return await Queries.query(query)
}

module.exports = {
	findOne,
	update,
}
