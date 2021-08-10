const socketIO = require('socket.io')
const socket = {}
let io
let conections = 0

function connect(server) {
	io = socketIO(server)
	socket.io = io

	//SokcetIO
	io.on('connection', (socket) => {
		newConexion()
		++conections
		let socketId = socket.id
		let clientIp = socket.request.connection.remoteAddress

		socket.join('mapConnect', () => {
			let rooms = Object.keys(socket.rooms)

			io.to('mapConnect').emit('A new user has joined the room')
		})

		socket.on('chat:message', (data) => {
			console.log(data)
			io.sockets.emit('chat:message', 'Message from server to everyOne')
		})

		socket.on('chat:typing', (data) => {
			//Con broadcast emite a todo  menos a quien lo origino
			socket.emit('chat:typing', 'Envia a quien lo genera')
			socket.broadcast.emit('chat:typing', 'Enviado a todos, menos a mi')
		})

		socket.on('disconnect', (message) => {
			console.log(`[DISCONNECT]: ${message}`)
			conections--
			showClients()
			nroConexiones()
		})

		showClients()
		nroConexiones()
	})
}

function showClients() {
	io.clients((error, clients) => {
		if (error) throw error
		console.log(`[CLIENTS]: [${clients}]`) // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
	})
}

function nroConexiones() {
	io.emit('nroConexiones', conections)
	console.log(`Cantidad de conexiones: ${conections}`)
}

function newConexion() {
	io.emit('newConexion', conections)
}

module.exports = {
	connect,
	socket,
}
