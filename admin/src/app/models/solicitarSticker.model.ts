export interface ISolicitarSticker {
  createdAt: Date;
  updatedAt: Date;
  cuentaId: number;
  description: string;
  id: number;
  state: number;
  userId: string;
  opcionesSolicitudSticker: string;
}
