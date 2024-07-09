import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaccion {
  id: number;
  monto: number;
  tipo: string;
  fecha: Date;
  estado: string;
  tarjeta: any; // Ajusta este tipo según tu modelo de Tarjeta
}

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private apiUrl = 'http://localhost:3000/api/transaccion/'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) { }

  getTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.apiUrl);
  }
}
