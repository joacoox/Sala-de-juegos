import { Component,ViewChild,ElementRef,AfterViewInit, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pacman',
  standalone: true,
  templateUrl: './pacman.component.html',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  styleUrl: './pacman.component.css'
})
export class PacmanComponent implements AfterViewInit
{
  constructor(private router: Router) {
  }

  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef;

  public width = 1200;
  public height = 600;
  heightBox : number = 40;
  widthBox : number = 40;
  pacmanVelocityOnY : number = 0;
  pacmanVelocityOnX : number = 0;
  pacmanPositionOnX : number = 60;
  pacmanPositionOnY : number = 60;
  pacmanRadio : number = 15;

  keys: KeyMap = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
  };

  lastKey : string = '';

  
  @HostListener('window:keydown', ['$event'])
  onKeyDown = (event:any ) =>{
    
      switch(event.key){
        case 'w':
          this.keys.w.pressed = true;
          this.lastKey = 'w';
        break;
        case 'a':
          this.keys.a.pressed = true;
          this.lastKey = 'a';
        break;
        case 's':
          this.keys.s.pressed = true;
          this.lastKey = 's';
        break;
        case 'd':
          this.keys.d.pressed = true;
          this.lastKey = 'd';
        break;
      }
      
  };

  @HostListener('window:keyup', ['$event'])
  onKeyUp = (event:any ) =>{
    
      switch(event.key){
        case 'w':
          this.keys.w.pressed = false;
        break;
        case 'a':
          this.keys.a.pressed = false;
        break;
        case 's':
          this.keys.s.pressed = false;
        break;
        case 'd':
          this.keys.d.pressed = false;
        break;
      }
      
  };
  ngAfterViewInit(): void {
   const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
   const context = canvas.getContext('2d');
   canvas.width = this.width;
   canvas.height = this.height;
    
   if(context)
   {
    this.drawMap(context);
    this.drawPacman(context);
    this.animate(context);
   }
  }

  drawMap(context : any){
    context.fillStyle = 'blue';
      const map = [
        ['-','-','-','-','-','-','-','-','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-',' ','-',' ','-',' ',' ',' ','-',],
        ['-',' ',' ',' ',' ',' ',' ',' ','-',],
        ['-','-','-','-','-','-','-','-','-',]
      ];  
      map.forEach((row , y)=> {
        row.forEach((symbol, x) =>{
          if(symbol === '-'){        
            context.fillRect(40*x, 40*y, this.heightBox, this.widthBox);
            if(this.pacmanPositionOnY - this.pacmanRadio + this.pacmanVelocityOnY<= 40*y + this.heightBox &&
              this.pacmanPositionOnX + this.pacmanRadio + this.pacmanVelocityOnX >= 40*x &&
              this.pacmanPositionOnY + this.pacmanRadio + this.pacmanVelocityOnY >= 40*y && 
              this.pacmanPositionOnX - this.pacmanRadio + this.pacmanVelocityOnX <= 40*x + this.widthBox){
                this.pacmanVelocityOnX = 0;
                this.pacmanVelocityOnY = 0;
            }
          }          
        });
      });
  }   

  drawPacman(context : any){
    context.beginPath();
    context.arc(this.pacmanPositionOnX,this.pacmanPositionOnY,this.pacmanRadio, 0, Math.PI * 2);
    context.fillStyle = 'yellow';
    context.fill();
    context.closePath();
  }

  updatePacman(context:any){
    this.pacmanPositionOnX += this.pacmanVelocityOnX;
    this.pacmanPositionOnY += this.pacmanVelocityOnY;
    this.drawPacman(context);
  }

  animate(context: CanvasRenderingContext2D){
    requestAnimationFrame(() => this.animate(context));
    context.clearRect(0,0, this.width, this.height);
   
    if(this.keys.w.pressed && this.lastKey === 'w'){
      this.pacmanVelocityOnY = -5;
    }else if (this.keys.a.pressed && this.lastKey === 'a'){
      this.pacmanVelocityOnX = -5;
    }else if (this.keys.s.pressed && this.lastKey === 's'){
      this.pacmanVelocityOnY = 5;     
    }else if (this.keys.d.pressed && this.lastKey === 'd'){
      this.pacmanVelocityOnX = 5;      
    }  
    this.drawMap(context);
    this.updatePacman(context);   
  }
  
}

interface KeyState {
  pressed: boolean;
}

interface KeyMap {
  w: KeyState;
  a: KeyState;
  s: KeyState;
  d: KeyState;
}
