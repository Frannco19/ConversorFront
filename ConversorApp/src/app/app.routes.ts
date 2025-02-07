import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminCurrencyComponent } from './pages/admin-currency/admin-currency.component';
import { UpdateSubscriptionComponent } from './pages/update-subscription/update-subscription.component';
import { DashboardContainerComponent } from './pages/dashboard-container/dashboard-container.component';
import { onlyLoginGuard } from './guards/only-login.guard';
import { onlyadminGuard } from './guards/only-admin.guard';
import { onlyPublicGuard } from './guards/only-public.guard';

export const routes: Routes = [
    {
        path: "",
        component: DashboardContainerComponent,
        canActivate: [onlyLoginGuard],
        children: [
            {
                path: "converter",
                component: ConverterComponent
            },
            {
                path: "admin-user",
                component: AdminUserComponent,
                canActivate: [onlyadminGuard]
            },
            {
                path: "admin-currency",
                component: AdminCurrencyComponent,
                canActivate: [onlyadminGuard]
            },
            {
                path: "update-subscription",
                component: UpdateSubscriptionComponent,
                canActivate: [onlyLoginGuard],
            },
        ]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [onlyPublicGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [onlyPublicGuard]
    },
    {
        path: "not-found",
        component: NotFoundComponent
    },
    {
        path: "**",
        redirectTo: "not-found",
        pathMatch: "full"
    }
];
