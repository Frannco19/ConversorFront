import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DataAuthService } from '../../services/data-auth.service';
import { ModalService } from '../../services/modal-service';

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
  modalService = inject(ModalService);

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  errorLogin = false;

  async login(loginForm: NgForm) {
    const { username, password } = loginForm.value;

    if (!username || !password) {
      this.errorLogin = true;
      this.loginEmptyFields();
      return;
    }

    const loginData = { username, password };
    const res = await this.authService.login(loginData);

    if (res) { 
      this.router.navigate(['/converter']).then(() => {
      });
    } else {
      this.errorLogin = true;
      this.loginFail();
    }
  }

  loginFail() {
    this.modalService.showError("Usuario y/o contraseña incorrecto/s!", "Intentar de nuevo");
  }

  loginEmptyFields() {
    this.modalService.showError("Campo/s vacio!", "Intentar de nuevo");
  }

}
