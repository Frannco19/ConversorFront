import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errorRegister = false;
  authService = inject(DataAuthService)
  router = inject(Router)
  showPassword: boolean = false; 

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async register(registerForm: NgForm) {
    
  }

  registerFail() {
    Swal.fire({
      title: "Campo/s incompleto!",
      willOpen: () => {
        const titleEl = document.querySelector('.swal2-title') as HTMLElement;
        const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
        const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
        if (titleEl) {
          titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        if (contentEl) {
          contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        if (confirmButton){
          confirmButton.style.backgroundColor = '#ffd000'; 
          confirmButton.style.color = 'black'; 
          confirmButton.style.border = 'none'; 
        }
      },
      confirmButtonText: "Intentar de nuevo"
    });
  }


}
