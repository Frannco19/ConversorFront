import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminCurrencyComponent } from './pages/admin-currency/admin-currency.component';
import { UpdateSubscriptionComponent } from './pages/update-subscription/update-subscription.component';

export const routes: Routes = [
    {
        path:"",
        component: LoginComponent
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"register",
        component: RegisterComponent
    },
    {
        path:"converter",
        component: ConverterComponent,
        children:[
            {
                path:"admin-user",
                component: AdminUserComponent
            },
            {
                path:"admin-currency",
                component: AdminCurrencyComponent
            },
            {
                path:"update-subscription",
                component: UpdateSubscriptionComponent
            },
        ]
    },
    {
        path:"not-found",
        component: NotFoundComponent
    },
    {
        path:"**",
        redirectTo: "not-found",
        pathMatch: "full"
    }
];
