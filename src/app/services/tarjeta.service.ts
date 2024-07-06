import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Tarjeta } from '../interfaces/tarjeta'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  // url de la app backend
  private myAppUrl: string;
  // url de la api
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint; // file:environment.ts
    this.myApiUrl = '/api/tarjeta/';
  }

    getTarjetas(): Observable<Tarjeta[]> {
      return this.http.get<Tarjeta[]>(this.myAppUrl + this.myApiUrl);
    }

    getTarjeta(card_number: number): Observable<Tarjeta> {
      return this.http.get<Tarjeta>(this.myAppUrl + this.myApiUrl + card_number);
    }

    createTarjeta(saldo: number, card_number: number): Observable<any> {
      return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, { saldo, card_number });
    }

    descontarSaldo(id: number, cantidad: number): Observable<any> {
      const url = `${this.myAppUrl}${this.myApiUrl}descontar`;
      return this.http.put(url, { id, cantidad });
    }

    recargarSaldo(id: number, cantidad: number): Observable<any> {
      const url = `${this.myAppUrl}${this.myApiUrl}recarga`;
      return this.http.put(url, { id, cantidad });
    }
}
