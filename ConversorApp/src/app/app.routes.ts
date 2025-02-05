import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminCurrencyComponent } from './pages/admin-currency/admin-currency.component';
import { UpdateSubscriptionComponent } from './pages/update-subscription/update-subscription.component';
import { DashboardContainerComponent } from './pages/dashboard-container/dashboard-container.component';

export const routes: Routes = [
    {
        path: "",
        component: DashboardContainerComponent,
        children: [
            {
                path: "converter",
                component: ConverterComponent
            },
            {
                path: "admin-user",
                component: AdminUserComponent
            },
            {
                path: "admin-currency",
                component: AdminCurrencyComponent
            },
            {
                path: "update-subscription",
                component: UpdateSubscriptionComponent
            },
        ]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
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
