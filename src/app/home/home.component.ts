import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,NgClass,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  fotos : Array<string> = ["../../assets/salon de juegos.jpg","../../assets/casinoroom.jpg"];
  index = 0;

  
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
}
