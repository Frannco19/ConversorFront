import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class ModalService {

  private applyCommonStyles() {
    const titleEl = document.querySelector('.swal2-title') as HTMLElement;
    const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
    const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
    const cancelButton = document.querySelector('.swal2-cancel') as HTMLElement;

    const fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    if (titleEl) titleEl.style.fontFamily = fontFamily;
    if (contentEl) contentEl.style.fontFamily = fontFamily;
    if (confirmButton) {
      confirmButton.style.fontFamily = fontFamily;
      confirmButton.style.backgroundColor = '#4CAF50';  
      confirmButton.style.color = 'white';              
      confirmButton.style.border = 'none';              
    }
    if (cancelButton) cancelButton.style.fontFamily = fontFamily;
  }

  showError(title: string, confirmText: string = "Intentar de nuevo") {
    Swal.fire({
      title,
      confirmButtonText: confirmText,
      willOpen: () => this.applyCommonStyles()
    });
  }

  showSuccess(title: string, text: string = "") {
    Swal.fire({
      title,
      text,
      icon: 'success',
      willOpen: () => this.applyCommonStyles()
    });
  }

  showConfirmation(title: string, text: string, confirmCallback: () => void) {
    Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      willOpen: () => this.applyCommonStyles()
    }).then(result => {
      if (result.isConfirmed) confirmCallback();
    });
  }

  showCustom(title: string, options: any = {}) {
    Swal.fire({
      title,
      ...options,
      willOpen: () => this.applyCommonStyles()
    });
  }
}
