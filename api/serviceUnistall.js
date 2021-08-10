var Service = require('node-windows').Service

// Create a new service object
var svc = new Service({
	name: 'Panama Tool Kit',
	description: 'Aplicativo con un kit de herramientas.',
	script: 'C:\\PublicadasSitioseguro\\NodeJs\\Panama_ToolKitNodeJs\\app.js',
	nodeOptions: ['--harmony', '--max_old_space_size=4096'],
})

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
	console.log('Uninstall complete.');
	console.log('The service exists: ',svc.exists);
})

svc.uninstall()
