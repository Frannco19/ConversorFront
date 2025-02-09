import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Currency } from '../../interfaces/Currency';
import { DataCurrencyService } from '../../services/data-currency-service';
import { FormsModule } from '@angular/forms';

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
  currencyService = inject(DataCurrencyService);

  constructor() {
    this.loadCurrencies();
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
