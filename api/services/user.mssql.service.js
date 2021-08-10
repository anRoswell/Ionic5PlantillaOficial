const Queries = require('./../db/queries')

const create = async (data) => {
	const query = `
      INSERT INTO [dbo].[users]
           ([usrEmail]
           ,[usrPassword]
           ,[usrNames]
           ,[usrLastNames]
           ,[identificationTypeId]
           ,[usrCedula]
           ,[usrNroCelular]
           ,[usrTelefonoFijo]
           ,[usrDireccion]
           ,[usrStatus]
           ,[lastLogin]
           ,[profileId]
           ,[usrTerminosCondiciones]
           ,[lastDateLogin]
           ,[createdAt]
           ,[updatedAt])
    VALUES
           ('${data.usrEmail}'
           ,'${data.usrPassword}'
           ,'${data.usrNames}'
           ,'${data.usrLastNames}'
           ,${data.identificationTypeId}
           ,${data.usrCedula}
           ,'${data.usrNroCelular}'
           ,'${data.usrTelefonoFijo}'
           ,'${data.usrDireccion}'
           ,1
           ,GETDATE()
           ,1
           ,'${data.usrTerminosCondiciones}'
           ,GETDATE()
           ,GETDATE()
           ,GETDATE()
           )
    `
	return await Queries.query(query)
}

const countOne = async (id) => {
	const query = `
      SELECT [id]
          ,[usrEmail]
          ,[usrPassword]
          ,[usrNames]
          ,[usrLastNames]
          ,[identificationTypeId]
          ,[usrCedula]
          ,[usrNroCelular]
          ,[usrTelefonoFijo]
          ,[usrDireccion]
          ,[usrStatus]
          ,[lastLogin]
          ,[profileId]
      FROM [dbo].[users]
      WHERE id = ${id}
    `
	const { recordset } = await Queries.query(query)
	return recordset
}

const update = async (id, data) => {
	const query = `
      UPDATE [dbo].[users]
      SET 
           [usrNameComplete] = '${data.usr_nameComplete}'
          ,[usrNroCelular] = '${data.usr_nroCelular}'
          ,[usrTelefonoFijo] = '${data.usr_telefonoFijo}'
          ,[usrDireccion] = '${data.usr_direccion}'
          ,[updatedAt] = GETDATE()
    WHERE id = ${id}
    `
	return await Queries.query(query)
}

const updatePass = async (id, usrPassword) => {
	const query = `
      UPDATE [dbo].[users]
      SET 
        [usrPassword] = '${usrPassword}'
        ,[updatedAt] = GETDATE()
    WHERE id = ${id}
    `
	return await Queries.query(query)
}

module.exports = {
	create,
	countOne,
	update,
	updatePass,
}
