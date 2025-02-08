import { Component, inject } from '@angular/core';

import { UserAdminService } from '../../services/data-userAdmin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { userAdmin } from '../../interfaces/userAdmin';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.scss'
})
export class AdminUserComponent {
  userAdminService = inject(UserAdminService);
  users: userAdmin[] = [];
  newUser: Partial<userAdmin> = {};
  selectedUser: userAdmin | null = null;

  constructor() {
    this.loadUsers();
  }

  // Cargar todos los usuarios
  async loadUsers() {
    const response = await this.userAdminService.getAllUsers();
    console.log('Respuesta del backend:', response); // ✅ Verificar la estructura de la respuesta
  
    if (response && Array.isArray(response)) {
      this.users = response;  // Carga solo si es un array válido
    } else {
      console.error('La respuesta no es un array de usuarios:', response);
      this.users = [];  // Vacía la lista si hay un error
    }
  }
  

  // Crear un nuevo usuario
  async createUser() {
    const success = await this.userAdminService.createUser(this.newUser);
    if (success) {
      alert('Usuario creado exitosamente');
      this.loadUsers();
      this.newUser = {}; // Limpiar formulario
    } else {
      alert('Error al crear el usuario');
    }
  }

  // Seleccionar usuario para actualizar
  selectUserForUpdate(user: userAdmin) {
    this.selectedUser = { ...user }; // Copia para evitar cambios directos
  }

  // Actualizar usuario seleccionado
  async updateUser() {
    if (this.selectedUser) {
      const success = await this.userAdminService.updateUser(this.selectedUser);
      if (success) {
        alert('Usuario actualizado exitosamente');
        this.loadUsers();
        this.selectedUser = null;
      } else {
        alert('Error al actualizar el usuario');
      }
    }
  }

  // Desactivar usuario
  async deactivateUser(userId: number) {
    const confirmDelete = confirm('¿Estás seguro de desactivar este usuario?');
    if (confirmDelete) {
      const success = await this.userAdminService.deactivateUser(userId);
      if (success) {
        alert('Usuario desactivado exitosamente');
        this.loadUsers();
      } else {
        alert('Error al desactivar el usuario');
      }
    }
  }
}
