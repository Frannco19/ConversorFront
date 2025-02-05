import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  esAdmin = true;
  authService = inject(DataAuthService);
  router = inject(Router);

  cerrarSesion(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
