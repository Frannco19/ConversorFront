import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  router = inject(Router);
  showPassword: boolean = false; 

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async login(loginForm: NgForm) {}

}
