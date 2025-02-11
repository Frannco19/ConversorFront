import { Component, inject } from '@angular/core';
import { DataSubscriptionService } from '../../services/data-subscription.service';
import { Subscription } from '../../interfaces/Subscription';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataAuthService } from '../../services/data-auth.service';
import { ModalService } from '../../services/modal-service';

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
  modalService = inject(ModalService);

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

  confirmSubscriptionChange(userId: number | undefined, subscriptionId: number) {
    if (userId === undefined) {
      console.error('El userId no está disponible.');
      return;
    }

    this.modalService.showConfirmation(
      '¿Estás seguro?',
      '¿Deseas actualizar tu suscripción?',
      async () => {
        const response = await this.subscriptionService.assignSubscriptionToUser(userId, subscriptionId);
        if (response) {
          this.modalService.showSuccess("Actualizado", "Tu suscripción ha sido actualizada.");
          this.loadCurrentSubscription();
        } else {
          this.modalService.showError("Error", "Hubo un problema al actualizar la suscripción.");
        }
      }
    );
  }
}
