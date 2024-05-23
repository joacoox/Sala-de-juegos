import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthfireService } from '../services/authfire/authfire.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class LoginComponent{
  email : string = "";
  password : string = "";
  flag : Boolean = true;
  flagError: boolean = false;
  msjError: string = "";
  constructor(private router: Router, public auth:AuthfireService, private firestore:Firestore) {
  }

  login(){
     
    this.auth.Login(this.email, this.password).then((res) => {
      if (res.user.email !== null){
        let col = collection(this.firestore, "logins");
        addDoc(col, {fecha: new Date(), "user": this.email});
        this.auth.userActive = res.user;
        this.goTo("home");
      }
    }).catch((e) => {
      this.flagError = true;  

      switch(e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/invalid-credential":
          this.msjError = "El email o contraseña son incorrectos";
          break;
        case "auth/missing-password":
          this.msjError = "Por favor introduzca una contraseña";
          break;
        default:
          this.msjError = e.code
          break;
      }           
    });
  }

  AutoLogin(){

    const email = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    if(password && email){
      email.value = "joaco@gmail.com";
      password.value = "123456";
    }  
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
