import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class DataSubscriptionService {

  constructor() {}

  async getAllSubscriptions(): Promise<any> {
    try {
      const res = await fetch(`${environment.API_URL}api/Subscription/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!res.ok) throw new Error('Error al obtener las suscripciones');
      return await res.json();
    } catch (error) {
      console.error('Error en getAllSubscriptions:', error);
      return null;
    }
  }

  async getSubscriptionDetails(subscriptionId: number): Promise<any> {
    try {
      const res = await fetch(`${environment.API_URL}api/Subscription/${subscriptionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!res.ok) throw new Error('Error al obtener detalles de la suscripción');
      return await res.json();
    } catch (error) {
      console.error('Error en getSubscriptionDetails:', error);
      return null;
    }
  }
}
