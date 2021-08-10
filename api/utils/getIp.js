const internalIp = require('internal-ip')
const publicIp = require('public-ip')

module.exports = async () => {
	console.log(`Ip publica: `, await publicIp.v4())
	console.log(`Ip local: `, internalIp.v4.sync())
}
