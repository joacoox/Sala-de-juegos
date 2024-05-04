import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
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
  email : string = "";
  password : string = "";
  flag : Boolean = true;
  flagError: boolean = false;
  msjError: string = "";
  constructor(private router: Router, public auth:Auth) {

  }

  login(){
     
    signInWithEmailAndPassword(this.auth, this.email, this.password).then((res) => {
      if (res.user.email !== null){
        this.goTo("home");
      }

      this.flagError = false;

    }).catch((e) => {
      this.flagError = true;  

      switch (e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/invalid-credential":
          this.msjError = "Ingrese bien los datos porfavor";
          break;
        default:
          this.msjError = e.code;
          break;
      }              
    });

    
}

  CloseSession(){
    signOut(this.auth);
  }
  
  AutoLogin(){

    signInWithEmailAndPassword(this.auth, "joaco@gmail.com","123456").then(res => {
      if (res) {
        this.goTo("home");
      } 
    });
    
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
