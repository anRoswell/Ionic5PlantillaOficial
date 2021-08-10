export interface IUserLogin {
  error: boolean;
  status: number;
  body: Body;
  id: number;
  name: string;
  access: string;
  lastDateLogin?: string;
  lastIpLogin?: string;
}

export interface Body {
  access: string;
  createdAt: Date;
  id: number;
  identificationTypeId: number;
  last_login: Date;
  profileId: number;
  updatedAt: Date;
  usr_cedula: string;
  usr_direccion: string;
  usr_email: string;
  usr_nameComplete: string;
  usr_nroCelular: string;
  usr_status: boolean;
  usr_telefonoFijo: string;
  usr_terminosCondiciones: boolean;
  name: string;
  lastDateLogin?: string;
  lastIpLogin?: string;
}
