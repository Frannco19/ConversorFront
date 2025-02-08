import { Component, inject, Inject } from '@angular/core';
import { Currency } from '../../interfaces/Currency';
import { DataCurrencyService } from '../../services/data-currency-service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-currency',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './admin-currency.component.html',
  styleUrl: './admin-currency.component.scss'
})
export class AdminCurrencyComponent {
  currencies: Currency[] = [];
  currencyService = inject(DataCurrencyService)
  newCurrency: Currency = { id: 0, currencyCode: '', currencyLegend: '', currencySymbol: '', convertibilityCurrency: 0 };
  selectedCurrency: Currency | null = null;

  constructor() {
    this.loadCurrencies();
  }

  async loadCurrencies() {
    this.currencies = await this.currencyService.getAllCurrencies();
  }

  async addCurrency() {
    if (await this.currencyService.addCurrency(this.newCurrency)) {
      this.loadCurrencies();
      this.newCurrency = { id: 0, currencyCode: '', currencyLegend: '', currencySymbol: '', convertibilityCurrency: 0 };
    }
  }

  selectCurrency(currency: Currency) {
    this.selectedCurrency = { ...currency };
  }

  async updateCurrency() {
    if (this.selectedCurrency && await this.currencyService.updateCurrency(this.selectedCurrency.id, this.selectedCurrency)) {
      this.loadCurrencies();
      this.selectedCurrency = null;
    }
  }

  async deleteCurrency(id: number) {
    if (confirm('¿Estás seguro de eliminar esta moneda?')) {
      if (await this.currencyService.deleteCurrency(id)) {
        this.loadCurrencies();
      }
    }
  }
}
