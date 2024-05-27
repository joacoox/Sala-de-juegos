import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path : '', redirectTo: '/login', pathMatch : 'full'},
    {path : 'home', component:HomeComponent},
    {path : 'login', 
    loadComponent: ()=>import("./login/login.component").then((c) =>c.LoginComponent)
    },
    {path:'quien-soy',
    loadComponent: ()=>import("./quien-soy/quien-soy.component").then((c) =>c.QuienSoyComponent)
    },
    {path:'register',
    loadComponent: ()=>import("./register/register.component").then((c) =>c.RegisterComponent)
    },
    {path:'ahorcado',
    loadComponent: ()=>import("./games/ahorcado/ahorcado.component").then((c) =>c.AhorcadoComponent)
    },
    {path:'mayoromenor',
    loadComponent: ()=>import("./games/mayor-o-menor/mayor-o-menor.component").then((c) =>c.MayorOMenorComponent)
    },
    {path:'preguntados',
    loadComponent: ()=>import("./games/preguntado/preguntado.component").then((c) =>c.PreguntadoComponent)
    },
    {path:'sudoku',
    loadComponent: ()=>import("./games/sudoku/sudoku.component").then((c) =>c.SudokuComponent)
    }
];
