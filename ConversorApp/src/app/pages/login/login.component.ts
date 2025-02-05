import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(DataAuthService)
  router = inject(Router);
  showPassword: boolean = false; 

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  errorLogin = false;
  async login(loginForm: NgForm) {
    const { username, password } = loginForm.value;

    if (!username || !password) {
      this.errorLogin = true;
      this.LoginEmptyFields();
      return;
    }

    const loginData = { username, password };
    //const res = await this.authService.login(loginData);

    
  }

  loginFail() {
    Swal.fire({
      title: "Usuario y/o contraseña incorrecto/s!",
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
          confirmButton.style.backgroundColor = '#80ff56'; 
          confirmButton.style.color = 'black'; 
          confirmButton.style.border = 'none'; 
        }
      },
      confirmButtonText: "Intentar de nuevo"
    });
  }

  LoginEmptyFields(){
    Swal.fire({
      title: "Campo/s vacio!",
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
          confirmButton.style.backgroundColor = '#80ff56'; 
          confirmButton.style.color = 'black'; 
          confirmButton.style.border = 'none'; 
        }
      },
      confirmButtonText: "Intentar de nuevo"
    });
  }

}
