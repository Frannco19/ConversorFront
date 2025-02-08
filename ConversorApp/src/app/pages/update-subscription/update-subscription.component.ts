import { Component, inject } from '@angular/core';
import { DataSubscriptionService } from '../../services/data-subscription.service';
import { Subscription } from '../../interfaces/Subscription';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-subscription.component.html',
  styleUrl: './update-subscription.component.scss'
})
export class UpdateSubscriptionComponent {
  subscriptions: Subscription[] = [];
  subscriptionService = inject(DataSubscriptionService);

  constructor() {
    this.loadSubscriptions(); // Cargar las suscripciones directamente en el constructor
  }

  async loadSubscriptions() {
    try {
      const data = await this.subscriptionService.getAllSubscriptions();
      if (data) {
        this.subscriptions = data;
        console.log(data)
      }
    } catch (error) {
      console.error('Error al cargar las suscripciones:', error);
    }
  }

  async viewSubscriptionDetails(subscriptionId: number) {
    try {
      const details = await this.subscriptionService.getSubscriptionDetails(subscriptionId);
      if (details) {
        console.log('Detalles de la suscripción:', details);
      }
    } catch (error) {
      console.error('Error al obtener detalles de la suscripción:', error);
    }
  }
}
