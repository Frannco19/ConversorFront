import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  esAdmin = true;
  authService = inject(DataAuthService);
  user = this.authService.user; 
  router = inject(Router);

  cerrarSesion(){
    this.authService.logOut();
    this.authService.user = undefined;
    this.router.navigate(['/login']);
  }
}
