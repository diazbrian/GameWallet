export interface User {
  nombre: string;
  email: string;
  contraseña: string;
  telefono: number;
  rol: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  contraseña: string;
  telefono: number;
  creacion: string | null;
  rol: string;
}
