import { Transaccion } from "./transaccion";

export interface Tarjeta {
  id: number;
  saldo: number;
  card_number: number;
  transacciones: Transaccion[];
  creacion: string | null;
}

export interface Tarjeta {
  saldo: number;
  card_number: number;
}