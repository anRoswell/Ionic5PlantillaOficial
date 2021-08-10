const admin = require('firebase-admin')
const moment = require('moment')
let resp = null

var serviceAccount = require('./../keyExtract/Firebase/androidexample-d95db-firebase-adminsdk-25av0-871faa5b6b.json')

const sendMessage = async (token, data) => {
	// Llamar a metodo para obtener el token del usuario y enviar mensaje

	if (resp === null) {
		resp = admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: 'https://androidexample-d95db.firebaseio.com',
		})
	}

	// This registration token comes from the client FCM SDKs.
	const date = moment().format('DD-MM-YYYY HH:mm:ss')
	const payload = {
		token,
		notification: {
			title: 'Titulo',
			body: `Cuerpo del mensaje: ${date}`,
		},
		android: {
			notification: {
				icon: 'stock_ticker_update',
				image: 'https://aseocapital.com.pa/wp-content/uploads/2017/09/LOGO-ASEO-C-01-e1506380790927.png',
				color: '#7e55c3',
			},
		},
		data,
	}

	// Send a message to the device corresponding to the provided
	// registration token.
	admin
		.messaging()
		//.sendToDevice(token, payload)
		.send(payload)
		.then((response) => {
			// Response is a message ID string.
			console.log('Successfully sent message:', response)
		})
		.catch((error) => {
			console.log('Error sending message:', error)
		})
}

const token =
	'fLzLBFD9Sjqg7SFNAJoxZx:APA91bGpsQGhlFhRiRQwuONCSsT5QFtuX_0dOUzJosBQwyEjWy-YIfHtJhVPJfckMsPaDjbkOSV-Kg6KlEWo5CSIgkBStwr9ZrW1SjcT3hxR-IIlTaDqSSxTkanp2vB6I9sBkUlQYx1K'
// firebase()
sendMessage(token, { campo1: '1', campo2: '2' })

// module.exports = {
// 	sendMessage,
// }
