import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';

export const routes: Routes = [
    {path : '', redirectTo: '/login', pathMatch : 'full'},
    {path : 'home', component:HomeComponent},
    {path : 'login', component:LoginComponent},
    {path:'quien-soy', component: QuienSoyComponent},

];
