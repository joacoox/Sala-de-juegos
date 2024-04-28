import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name : string = "";
  password : string = "";
  flag : Boolean = true;
  constructor(private router: Router) {

  }

  login(){
    if(this.name == "a" && this.password == "a"){
      this.goTo("home")
    }
  }

  log(){

    
    if(this.name == "" && this.password == "")
    {
      console.log("No ingresaste nada");
      this.flag = false;
    }
    if(this.password.length < 4){
      console.log("Clave muy corta");
      this.flag = false;
    }
    if(this.flag){
      this.goTo("home");
    }

  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
