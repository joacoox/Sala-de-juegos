import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import { AuthfireService } from '../services/authfire/authfire.service';
import { Firestore, addDoc, collection, collectionData, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Subscription } from 'rxjs/internal/Subscription';
import { Chat } from '../models/chat';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass, NgFor, NgIf, NavbarComponent]
})
export class HomeComponent implements OnInit, OnDestroy{

  fotos : Array<string> = ["../../assets/salon de juegos.jpg","../../assets/casinoroom.jpg"];
  index = 0;
  private sub!:Subscription;
  public chatCollection:Chat[] = [];
  private messageInput?: HTMLInputElement;


  constructor(private router: Router, public auth : AuthfireService, private fireStore:Firestore) {
  }

  ngOnDestroy(): void {
    this.chatCollection = [];
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  

  ngOnInit(): void {
    this.messageInput = document.getElementById('message-input') as HTMLInputElement;
    console.log(this.auth.getUserEmail());
    this.CargarChat();
  }

  LogOut(){
    this.auth.logout();
    this.router.navigateByUrl("login");
  }

  changeImage(direction: 'next' | 'previous'): void {
    const image = document.getElementById('carrusel-foto') as HTMLImageElement;
  
    if (image) {
      if (direction === 'next') {
        this.index = (this.index + 1) % this.fotos.length; 
      } else {
        this.index = (this.index - 1 + this.fotos.length) % this.fotos.length; 
      }
      image.src = this.fotos[this.index];    
    }
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
  
  EnviarMensaje(){
    if(this.messageInput)
    {
      const messageText = this.messageInput.value;
      if (messageText.trim() !== '') 
      {
          let col = collection(this.fireStore, "chats");
          const chat = {
            "mensaje":messageText, 
            "user": this.auth.getUserEmail(),
            "fecha": new Date().toISOString()};
      
          addDoc(col, chat);   

          this.chatCollection.push(chat);
          this.messageInput.value = '';
      }
    }
  }

  CargarChat(){
    
    let col = collection(this.fireStore, "chats");
    const filteredQuery = query(
      col,
      orderBy('fecha','asc')
    );
    const observable = collectionData(filteredQuery);
      this.sub = observable.subscribe((respuesta:any) => {
      this.chatCollection = [];
      this.chatCollection.push(...respuesta);
    })
  } 
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleString('es-ES', options);
  }

}
