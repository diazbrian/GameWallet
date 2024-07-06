import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User, Usuario } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url de la app backend
  private myAppUrl: string;
  // url de la api
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint; // file:environment.ts
    this.myApiUrl = '/api/usuario/';
  }

  // metodo para registrar usuario (post)
  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  // TODO: Token de sesion
  login(user: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}login/`, user);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.myAppUrl}${this.myApiUrl}usuarios/`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}borrar/${id}/`);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}actualizar/${id}/`, user);
  }

}
