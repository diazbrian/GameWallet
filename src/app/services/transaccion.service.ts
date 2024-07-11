import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarjeta {
  card_number: number;
}

export interface Transaccion {
  id: number;
  monto: number;
  tipo: string;
  fecha: Date;
  estado: string;
  tarjeta: Tarjeta;
}

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private apiUrl = 'http://localhost:3000/api/transaccion';

  constructor(private http: HttpClient) {}

  getTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.apiUrl);
  }

  getTransaccionesPorTarjeta(cardNumber: number): Observable<Transaccion[]> {
    const url = `${this.apiUrl}?cardNumber=${cardNumber}`;
    return this.http.get<Transaccion[]>(url);
  }
}
