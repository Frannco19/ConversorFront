import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DataAuthService } from '../../services/data-auth.service';
import { ModalService } from '../../services/modal-service';

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
  modalService = inject(ModalService);

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async register(registerForm: NgForm) {
    const {email, username, password} = registerForm.value;
    if (!email || !username || !password) {
      this.registerFail();
      return;
    }
    const registerData = {email, username, password};

    const res = await this.authService.register(registerData)

    if (res.success) {
      console.log(res.message);
      this.router.navigate(['/login']).then(() => {
        this.modalService.showSuccess("Registro Exitoso!", "¡Bienvenido!");
      });
    } else {
      this.errorRegister = true;
      this.modalService.showError("Error en el registro", "Inténtalo de nuevo más tarde.");
    }
  }

  registerFail() {
    this.modalService.showError("Campo/s incompleto!", "Intentar de nuevo");
  }

  registerSuccess() {
    this.modalService.showSuccess("Registro Exitoso!", "¡Bienvenido!");
  }
}
