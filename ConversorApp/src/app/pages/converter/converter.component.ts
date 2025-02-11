import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Currency } from '../../interfaces/Currency';
import { DataCurrencyService } from '../../services/data-currency-service';
import { FormsModule } from '@angular/forms';
import { SubscriptionStatus } from '../../interfaces/SubscriptionStatus';
import { DataSubscriptionService } from '../../services/data-subscription.service';
import { DataAuthService } from '../../services/data-auth.service';
import { ConversionRequest } from '../../interfaces/ConversionRequest';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent {
  currencies: Currency[] = [];
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number = 0;
  convertedAmount: number | null = null;
  subscriptionStatus: SubscriptionStatus | null = null;
  currencyService = inject(DataCurrencyService);
  subscriptionService = inject(DataSubscriptionService);
  authService = inject(DataAuthService);
  
  constructor() {
    this.loadCurrencies();
    this.loadSubscriptionStatus();
  }

  async convert() {
    const request: ConversionRequest = {
      fromCurrencyCode: this.fromCurrency,
      toCurrencyCode: this.toCurrency,
      amount: this.amount
    };

    const response = await this.currencyService.convertCurrency(request);

    if (response) {
      this.convertedAmount = response.convertedAmount;
      await this.loadSubscriptionStatus();
    } else {
      console.error('Error en la conversión.');
    }
  }

  async loadSubscriptionStatus() {
    const user = this.authService.user;
    if (user) {
      try {
        const status = await this.subscriptionService.getCurrentSubscriptionStatus(user.userId);
        this.subscriptionStatus = status;
      } catch (error) {
        console.error('Error al cargar el estado de la suscripción:', error);
      }
    }
  }

  async loadCurrencies() {
    try {
      this.currencies = await this.currencyService.getAllCurrencies() || [];
      if (this.currencies.length >= 2) {
        this.fromCurrency = this.currencies[0].currencyCode;
        this.toCurrency = this.currencies[1].currencyCode;
      }
    } catch (error) {
      console.error('Error al cargar las monedas:', error);
    }
  }

  swapCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }
}
