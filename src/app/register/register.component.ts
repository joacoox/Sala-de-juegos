import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

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

  constructor(public auth : Auth, private router: Router){

  }


  Register(){

    if(this.password == this.repeatPassword){
      createUserWithEmailAndPassword(this.auth, this.email, this.password).then((res) => {
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
          case "auth/email-already-in-use":
            this.msjError = "Email ya en uso";
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
