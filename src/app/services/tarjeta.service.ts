import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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

  getTarjetas() {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  getTarjeta(card_number: number) {
    return this.http.get(this.myAppUrl + this.myApiUrl + card_number);
  }

}
