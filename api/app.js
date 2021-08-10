const express = require('express')
const app = express()
const routesApi = require('./routing/api/routes')
const routesAdmin = require('./routing/web/routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require('./utils/socketio')
const { PORTS, PORT } = require('./config')
const errors = require('./utils/errors')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const helmet = require('helmet')
const path = require('path')
const https = require('https')
//Permite imprimir por pantalla el documento js q imprime por consola
// const CsbInspector = require('./utils/CsbInspector')(app, fs)
const CsbInspector = require('csb-inspector/express-socket')
const options = {
	app: app,
	route: '_console',
	port: 8888,
	outputs: [
		(path, prop, args) => {
			fs.appendFileSync('file.txt', path)
		},
	],
}

const swaggerDoc = require('./api/swagger.json')

// app.use(helmet())

// Implementación de cors
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
		tempFileDir: '/tmp/',
	}),
)

//Headers
app.use(cors({ exposedHeaders: ['Authorization'] }))
app.use(bodyParser.json({ extended: true, limit: '50Mb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50Mb' }))

// Ruta de la carpeta pública
const dashBoard = path.resolve(__dirname, 'public')
const pictures = path.resolve(__dirname, 'uploads')
app.use(express.static(dashBoard))
app.use(express.static(pictures))
global.publicPath = dashBoard

//Routes
app.get('/', (req, res) => res.status(401).json({ status: 'Servidor funcionando correctamente!!! 👌' }))

// Importación de las rutas de la app
app.use('/api/v1.0/', routesApi)
app.use('/admin/v1.0/', routesAdmin)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.disable('x-powered-by')

app.use(errors)

//Imprime por console y Web (http://localhost:8181/_console) los mensajes console.log
CsbInspector(options)

// Ruta de error cuando no se encuentre definida
app.get('*', (req, res) => {
	res.status(401).json({ status: 'Ruta no existe, favor verificar!!! 👎🏿' })
})

// Start server
function startServer() {
	// OpenSsl
	var httpsOptions = {
		key: fs.readFileSync('./keyExtract/drlive-decrypted.key'),
		cert: fs.readFileSync('./keyExtract/drlive.crt'),
		ca: [fs.readFileSync('./keyExtract/gd_bundle01.crt'), fs.readFileSync('./keyExtract/gd_bundle02.crt')],
	}

	const serverHttp = app.listen(PORT, () => {
		console.log(`Servidor http escuchando en el puerto ${PORT}`)
	})

	// const serverHttps = https.createServer(httpsOptions, app).listen(PORTS, () => {
	// 	console.log(`Servidor https escuchando en el puerto ${PORTS}`)
	// })

	//Iniciamos SokcetIO
	socket.connect(serverHttp)
	// socket.connect(serverHttps)
}

startServer()
