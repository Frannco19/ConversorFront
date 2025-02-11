import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { Currency } from "../interfaces/Currency";
import { ConversionRequest } from '../interfaces/ConversionRequest';
import { ConversionResponse } from '../interfaces/ConversionResponse';
import { CurrencyForUpdate } from '../interfaces/currencyForUpdate';

@Injectable({
  providedIn: 'root'
})
export class DataCurrencyService {

  // Aquí almacenaremos las monedas cargadas
  currencies: Currency[] = [];

  constructor() {
    // Se carga automáticamente al instanciar el servicio
    this.getAllCurrencies();
  }

  async getAllCurrencies(): Promise<Currency[]> {
    const res = await fetch(`${environment.API_URL}api/Currency/currencies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return res.ok ? await res.json() : [];
    console.log(res)
  }

  async addCurrency(currency: Currency): Promise<boolean> {
    const res = await fetch(`${environment.API_URL}api/Currency/currency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(currency)
    });
    return res.ok;
  }

  async updateCurrency(id: number, currency: CurrencyForUpdate): Promise<boolean> {
    console.log("Datos enviados al backend:", currency);
    const res = await fetch(`${environment.API_URL}api/Currency/currency/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(currency)
    });
    return res.ok;
  }

  async deleteCurrency(id: number): Promise<boolean> {
    const res = await fetch(`${environment.API_URL}api/Currency/currency/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return res.ok;
  }

  async convertCurrency(request: ConversionRequest): Promise<ConversionResponse | null> {
    try {
      const res = await fetch(`${environment.API_URL}api/Currency/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(request)
      });

      if (!res.ok) throw new Error('Error al realizar la conversión');
      return await res.json();
    } catch (error) {
      console.error('Error en convertCurrency:', error);
      return null;
    }
  }


}
