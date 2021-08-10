export interface IRegisterUser {
	usr_email: string
	usr_password: string
	usr_nameComplete: string
	identificationTypeId: number
	usr_cedula: string
	usr_nroCelular: string
	usr_telefonoFijo?: string
	usr_direccion: string
	usr_terminosCondiciones: boolean
}

export interface ILogin {
	email: string
	password: string
}

export interface ICContratoDet {
	TIPO: string
	CICLCODI: string
	CODIGO_PPAL: string
	createdAt?: Date
	CUENTACONTRATO: string
	DIRENVIO: string
	DIRECCION: string
	ESTRCODI: string
	FRECBARR: string
	FRECRECO: string
	id: number
	NOMBRES: string
	TELEFONO: string
	UNR: string
	updatedAt?: Date
	UR: string
	userId: number
	rancodi?: string
	VOLUBASU: string
	TARIFA?: string
}

export interface Photo {
	filepath: string
	webviewPath: string
	base64?: string
	sanitizer?: any
}

export interface IReportarPago {
	montoPago: string
	fechaPago: Date
	banco: number
	foto: string
	state: number
	userId: number
	cuentaId: number
}

export interface IMenu {
	icon: string
	name: string
	redirectTo: string
}

export interface IBancos {
	id: number
	descripcion: string
	state: boolean
	createdAt: Date
	updatedAt: Date
}

export interface ISolicitarstickers {
	cuentaId: number
	userId: number
	stickeropcionesId: number
	observaciones: string
	state: boolean
}

export interface IPqr {
	opcionespqrId: number
	state: boolean
	descripcion: string
	userId: number
	cuentaId: number
}

export interface EmailVerification {
	usrNames: string
	usrLastNames: string
	usrEmail: string
}

export interface IMessage {
	type: string
	message: string
	item?: number
}
