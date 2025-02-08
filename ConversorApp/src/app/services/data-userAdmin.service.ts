import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { userAdmin } from '../interfaces/userAdmin';



@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  // Obtener todos los usuarios
  async getAllUsers(): Promise<userAdmin[] | null> {
    try {
      const res = await fetch(`${environment.API_URL}api/Admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!res.ok) throw new Error('Error al obtener usuarios');
      return await res.json();
    } catch (error) {
      console.error('Error en getAllUsers:', error);
      return null;
    }
  }

  // Crear un nuevo usuario
  async createUser(user: Partial<userAdmin>): Promise<boolean> {
    const res = await fetch(`${environment.API_URL}api/Admin/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(user)
    });
    return res.ok;
  }

  // Crear un nuevo administrador
  async createAdmin(adminUser: Partial<userAdmin>): Promise<boolean> {
    const res = await fetch(`${environment.API_URL}api/Admin/create-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(adminUser)
    });
    return res.ok;
  }

  // Actualizar usuario
  async updateUser(user: userAdmin): Promise<boolean> {
    const res = await fetch(`${environment.API_URL}api/Admin/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(user)
    });
    return res.ok;
  }

  // Desactivar usuario
  async deactivateUser(userId: number): Promise<boolean> {
    const res = await fetch(`${environment.API_URL}api/Admin/deactivate/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return res.ok;
  }
}

