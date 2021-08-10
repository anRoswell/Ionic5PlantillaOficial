//const CsbInspector = require('csb-inspector')
const CsbInspector = require('csb-inspector/express-socket')

module.exports = (app, fs) => {
	const options = {
		app: app,
		route: '_console',
		port: 8888,
		outputs: [
			(path, prop, args) => {
				fs.appendFileSync('./logs/CsbInspector.txt', path)
			},
		],
	}

	CsbInspector(options)
}
