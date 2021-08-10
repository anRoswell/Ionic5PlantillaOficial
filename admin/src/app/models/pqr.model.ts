export interface IPqrs {
  createdAt: Date;
  updatedAt: Date;
  cuentaId: number;
  description: string;
  id: number;
  observacion: string;
  opcionespqrId: string;
  state: number;
  userId: string;
  socket?: boolean;
}
