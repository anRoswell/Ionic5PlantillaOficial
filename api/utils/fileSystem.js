const path = require('path')
const fs = require('fs')
const moment = require('moment')
const uniqid = require('uniqid')

class FileSystem {
	constructor() {}

	async guardarImagenTemporal(file, data, userId, carpeta) {
		return await new Promise((resolve, reject) => {
			// Crear carpeta
			const path = this.crearCarpetaUsuario(userId, data.id, carpeta)

			// Nombre Archivo
			const nombreArchivo = this.generarNombreUnico(file.name)
			const filePath = `${path.pathUserFinal}/${nombreArchivo}`

			//Mover archivo de tmp a carpetaFinal
			file.mv(filePath, (err) => {
				if (err) {
					reject(err)
				} else {
					const retorno = {
						nombreArchivo,
						ruta: `${path.pathBD}/${nombreArchivo}`,
					}
					resolve(retorno)
				}
			})
		})
	}

	generarNombreUnico(nombreOriginal) {
		const nombreArr = nombreOriginal.split('.')
		const extension = nombreArr[nombreArr.length - 1]

		const idUnico = uniqid()

		return `${idUnico}.${extension}`
	}

	crearCarpetaUsuario(userId, id, carpeta) {
		const pathBD = `${carpeta}/${userId}/${id}`
		const pathRaiz = path.resolve(__dirname, `../uploads/${carpeta}`)
		const pathUser = pathRaiz + `/${userId}`
		const pathUserCuentaContrato = pathUser + `/${id}`
		const pathUserFinal = pathUserCuentaContrato + '/'
		console.log(pathUserFinal)

		let exist = fs.existsSync(pathRaiz)
		if (!exist) {
			fs.mkdirSync(pathRaiz)
		}

		exist = fs.existsSync(pathUser)
		if (!exist) {
			fs.mkdirSync(pathUser)
		}

		exist = fs.existsSync(pathUserCuentaContrato)
		if (!exist) {
			fs.mkdirSync(pathUserCuentaContrato)
		}

		exist = fs.existsSync(pathUserFinal)
		if (!exist) {
			fs.mkdirSync(pathUserFinal)
		}

		const paths = {
			pathUserFinal,
			pathBD,
		}

		return paths
	}
}

module.exports = FileSystem
