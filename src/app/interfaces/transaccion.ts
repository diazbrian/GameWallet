import { Tarjeta } from "./tarjeta";

export interface Transaccion {
  id: number;
  monto: number;
  tipo: string;
  fecha: Date;
  estado: string;
  tarjeta: Tarjeta;
}
