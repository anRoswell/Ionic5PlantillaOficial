export interface IPayReport {
  createdAt: Date;
  cuentaId: number;
  description: string;
  id: number;
  state: number;
  updatedAt: Date;
  userId: string;
  socket?: boolean;
}
