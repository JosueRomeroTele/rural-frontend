export interface Usuario {
  dni: string;
  name?: string;
  lastname?: string;
  email: string;
  role: number;
  password?: string;
  token?: string;
}
