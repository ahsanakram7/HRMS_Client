import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {

    const decoded = this.getDecodedToken();

    if (!decoded)
      return false;

    return decoded.exp * 1000 > Date.now();
  
  }
  
  getToken(): string | null {
  
    //console.log("getToken called:", localStorage.getItem('token'));

    return localStorage.getItem('token');
  
  }
  
  saveToken(token: string): void {
  
    localStorage.setItem('token', token);
  
  }
  
  removeToken(): void {
  
    localStorage.removeItem('token');
  
  }

  saveUser(user: any): void {

    localStorage.setItem('user', JSON.stringify(user));
  
  }
  
  getUser(): any {
  
    const user = localStorage.getItem('user');
  
    return user ? JSON.parse(user) : null;
  
  }
  
  logout(): void {
  
    localStorage.removeItem('token');
  
    localStorage.removeItem('user');
  
  }

  getDecodedToken(): any {

    const token = this.getToken();
  
    if (!token)
      return null;
  
    return jwtDecode(token);
  
  }

  getRoles(): string[] {

    const decoded = this.getDecodedToken();
  
    if (!decoded)
      return [];
  
    const roles = decoded.role;
  
    if (!roles)
      return [];
  
    return Array.isArray(roles)
      ? roles
      : [roles];
  
  }

  hasRole(role: string): boolean {

    return this.getRoles().includes(role);
  
  }

  register(model: Register) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/register`, model);
  }

  login(model: Login) : Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/login`, model);
  }

}
