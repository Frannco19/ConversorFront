import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: []
    },
    {
        path:"register",
        component: RegisterComponent,
        canActivate: []
    },
    {
        path:"not-found",
        component: NotFoundComponent,
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    }
];
