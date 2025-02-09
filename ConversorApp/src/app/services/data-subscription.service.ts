import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { UserSubscriptionDetails } from '../interfaces/userSubscriptionDetails';

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

  async getCurrentSubscription(): Promise<UserSubscriptionDetails | null> {
    try {
      const res = await fetch(`${environment.API_URL}api/User/user/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!res.ok) throw new Error('Error al obtener la suscripción actual');
      return await res.json();
    } catch (error) {
      console.error('Error en getCurrentUserSubscription:', error);
      return null;
    }
  }

  async assignSubscriptionToUser(userId: number, subscriptionId: number): Promise<{ message: string; status: any } | null> {
    try {
      const res = await fetch(`${environment.API_URL}api/Subscription/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ UserId: userId , SubscriptionId: subscriptionId })
      });

      if (!res.ok) throw new Error('Error al asignar la suscripción');
      return await res.json();
    } catch (error) {
      console.error('Error en assignSubscriptionToUser:', error);
      return null;
    }
  }
}
