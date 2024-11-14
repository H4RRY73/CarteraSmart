import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL base del JSON Server
  private currentUser: any = null; // Usuario autenticado

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Establecer el usuario autenticado
  setAuthenticatedUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user)); // Guardar en localStorage
  }

  // Obtener el usuario autenticado
  getAuthenticatedUser(): any {
    if (!this.currentUser) {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
    return this.currentUser;
  }

  updateUser(userId: string, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, updatedUser);
  }

  // Cerrar sesión
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

}
