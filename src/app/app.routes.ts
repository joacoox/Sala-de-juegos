import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { PacmanComponent } from './games/pacman/pacman.component';
import { RegisterComponent } from './register/register.component';
import { AhorcadoComponent } from './games/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './games/mayor-o-menor/mayor-o-menor.component';

export const routes: Routes = [
    {path : '', redirectTo: '/login', pathMatch : 'full'},
    {path : 'home', component:HomeComponent},
    {path : 'login', 
    loadComponent: ()=>import("./login/login.component").then((c) =>c.LoginComponent)
    },
    {path:'quien-soy',
    loadComponent: ()=>import("./quien-soy/quien-soy.component").then((c) =>c.QuienSoyComponent)
    },
    {path:'pacman',
    loadComponent: ()=>import("./games/pacman/pacman.component").then((c) =>c.PacmanComponent)
    },
    {path:'register',
    loadComponent: ()=>import("./register/register.component").then((c) =>c.RegisterComponent)
    },
    {path:'ahorcado',
    loadComponent: ()=>import("./games/ahorcado/ahorcado.component").then((c) =>c.AhorcadoComponent)
    },
    {path:'mayoromenor',
    loadComponent: ()=>import("./games/mayor-o-menor/mayor-o-menor.component").then((c) =>c.MayorOMenorComponent)
    }

];
