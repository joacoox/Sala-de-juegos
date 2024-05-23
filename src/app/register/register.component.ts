import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthfireService } from '../services/authfire/authfire.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLinkActive,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email : string = "";
  password : string = "";
  repeatPassword : string = "";
  flagError: boolean = false;
  msjError: string = "";

  constructor(private router: Router, public auth : AuthfireService){

  }


  Register(){

    if(this.password == this.repeatPassword){
      this.auth.Register(this.email, this.password).then((res) => {
        if (res.user.email !== null){
          this.auth.userActive = res.user;
          this.goTo("home");
        }
      }).catch((e) => {
        this.flagError = true;
        switch (e.code) {
          case "auth/invalid-email":
            this.msjError = "Email invalido";
          break;
          case "auth/email-already-in-use":
            this.msjError = "Email ya en uso";
          break;
          case "auth/weak-password":
            this.msjError = "La contraseña debe ser de mas de 6 caracteres";
          break;
          default:
            this.msjError = e.code;
          break;
        }
      });

    }else{
      this.flagError = true;
      this.msjError = "Las contraseñas son distintas";
    }
    
  }

 
  goTo(path: string) {
    this.router.navigate([path]);
  }
}
