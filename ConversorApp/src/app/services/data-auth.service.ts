import { Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Register } from "../interfaces/register";
import { User } from "../interfaces/user";
import { LoginRequest, LoginResponse } from "../interfaces/LoginRequest";

@Injectable({
  providedIn: 'root'
})

export class DataAuthService {

  user: { username: string; token: string; isAdmin: boolean } | undefined;

  constructor() {
    const token = localStorage.getItem("authToken");
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      console.log('isAdmin:', tokenPayload.state);
  
      this.user = {
        username: tokenPayload.Name,
        token: token,
        isAdmin: tokenPayload.state === "True"  // 🚀 Persistimos la info del rol
      };
    }
  }

  async login(loginData: LoginRequest) {
    const res = await fetch(`${environment.API_URL}api/User/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
  
    if (!res.ok) {
      console.error('Error de autenticación:', await res.text());
      return false;
    }
  
    const resJson: LoginResponse = await res.json();
    if (!resJson.token) return false;
  
    localStorage.setItem("authToken", resJson.token);
  
    // 🚀 Decodificar el token para obtener los claims
    const tokenPayload = JSON.parse(atob(resJson.token.split('.')[1]));
  
    this.user = {
      username: tokenPayload.Name,
      token: resJson.token,
      isAdmin: tokenPayload.state === "True"  // ✅ Convertimos "True"/"False" a booleano
    };
  
    return true;
  }

  async register(registerData: Register) {
    try {
      const res = await fetch(`${environment.API_URL}api/User/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error en el registro:', errorText);
        return { success: false, message: errorText };
      }
  
      const message = await res.text();  // ✅ Procesar el texto de la respuesta
      return { success: true, message };  // 🚀 Devolver un objeto con el estado y el mensaje
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return { success: false, message: 'Error en la conexión con el servidor.' };
    }
  }
  
  

  loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      this.user = { username: '', token, isAdmin: false };
    }
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
  }

  logOut(): void {
    this.clearToken();
    this.user = undefined;
    window.location.href = '/login';
  }

}