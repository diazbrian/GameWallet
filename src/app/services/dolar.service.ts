import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Dolar } from '../interfaces/dolar';

@Injectable({
  providedIn: 'root'
})
export class DolarService {
  // url de la app backend
  private myAppUrl: string;
  // url de la api
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint; // file:environment.ts
    this.myApiUrl = '/api/dolar';
  }

  getDolar(): Observable<Dolar[]> {
    return this.http.get<Dolar[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
