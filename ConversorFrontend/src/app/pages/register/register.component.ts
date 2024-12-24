import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router = inject(Router)
  showPassword: boolean = false; 


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async register(registerForm: NgForm) {}
}
