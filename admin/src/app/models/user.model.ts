export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  mobile: string;
  profileId: string;
  token?: string;
  validation?: string;
  lastDateLogin?: string;
  lastIpLogin?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
