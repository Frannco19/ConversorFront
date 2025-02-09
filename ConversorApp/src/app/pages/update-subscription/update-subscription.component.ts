import { Component, inject } from '@angular/core';
import { DataSubscriptionService } from '../../services/data-subscription.service';
import { Subscription } from '../../interfaces/Subscription';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-update-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-subscription.component.html',
  styleUrl: './update-subscription.component.scss'
})
export class UpdateSubscriptionComponent {
  subscriptions: Subscription[] = [];
  currentSubscriptionId: number | undefined;
  subscriptionService = inject(DataSubscriptionService);
  authService = inject(DataAuthService);

  constructor() {
    this.loadSubscriptions();
    this.loadCurrentSubscription();
  }

  async loadSubscriptions() {
    try {
      const data = await this.subscriptionService.getAllSubscriptions();
      if (data) {
        this.subscriptions = data;
      }
    } catch (error) {
      console.error('Error al cargar las suscripciones:', error);
    }
  }

  async loadCurrentSubscription() {
    try {
      const currentDetails = await this.subscriptionService.getCurrentSubscription();
      this.currentSubscriptionId = currentDetails?.subscriptionId;
    } catch (error) {
      console.error('Error al obtener la suscripción actual:', error);
    }
  }

  async confirmSubscriptionChange(userId: number | undefined, subscriptionId: number) {
    if (!userId) {
      console.error('No se pudo obtener el userId del usuario.');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar tu suscripción?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
      willOpen: () => {
        const titleEl = document.querySelector('.swal2-title') as HTMLElement;
        const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
        const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
        const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;
    
        if (titleEl) titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        if (contentEl) contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        if (confirmButton) {
          confirmButton.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
          confirmButton.style.backgroundColor = '#4CAF50';  
          confirmButton.style.color = 'white';              
          confirmButton.style.border = 'none';              
        }
        if (cancelButton) cancelButton.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.subscriptionService.assignSubscriptionToUser(userId, subscriptionId);
        if (response) {
          Swal.fire({
            title: 'Actualizado',
            text: 'Tu suscripción ha sido actualizada.',
            icon: 'success',
            willOpen: () => {
              const titleEl = document.querySelector('.swal2-title') as HTMLElement;
              const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
              if (titleEl) titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
              if (contentEl) contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            }
          });
          this.loadCurrentSubscription();
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar la suscripción.',
            icon: 'error',
            willOpen: () => {
              const titleEl = document.querySelector('.swal2-title') as HTMLElement;
              const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
              if (titleEl) titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
              if (contentEl) contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            }
          });
        }
      }
    });
    
  }
}
