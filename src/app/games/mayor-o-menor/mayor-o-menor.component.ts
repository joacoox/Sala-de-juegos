import { Component, OnInit } from '@angular/core';
import { MayoromenorService } from '../../services/mayor-o-menor/mayoromenor.service';
import { Card } from '../../models/card';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mayor-o-menor',
  standalone: true,
  imports: [NgIf, RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './mayor-o-menor.component.html',
  styleUrl: './mayor-o-menor.component.css'
})
export class MayorOMenorComponent implements OnInit{

  cards: Card[] = [];
  currentCard: Card | null = null;
  nextCard: Card | null = null;
  score: number = 0;
  lives: number = 3;
  gameOver: boolean = false;

  constructor(private deckService: MayoromenorService, private router: Router) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    this.deckService.shuffleDeck().subscribe(deckResponse => {
      this.deckService.setDeckId(deckResponse.deck_id);
      this.resetGameVariables();
      this.fetchNextCard();
    });
  }

  resetGameVariables(): void {
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.cards = [];
    this.currentCard = null;
    this.nextCard = null;
  }

  fetchNextCard(): void {
    this.deckService.drawCards(2).subscribe(drawResponse => {
      this.cards = drawResponse.cards;
      this.currentCard = this.cards[0];
      this.nextCard = this.cards[1];
    });
  }

  guessHigher(): void {
    this.checkGuess(true);
  }

  guessLower(): void {
    this.checkGuess(false);
  }

  checkGuess(isHigher: boolean): void {
    if (this.currentCard && this.nextCard) {
      const currentCardValue = this.mapCardValueToNumber(this.currentCard.value);
      const nextCardValue = this.mapCardValueToNumber(this.nextCard.value);

      if ((isHigher && nextCardValue > currentCardValue) || (!isHigher && nextCardValue < currentCardValue)) {
        this.score += 1;
      } else {
        this.lives -= 1;
        if (this.lives <= 0) {
          this.gameOver = true;
        }
      }

      this.currentCard = this.nextCard;
      if (!this.gameOver) {
        this.deckService.drawCards(1).subscribe(drawResponse => {
          this.nextCard = drawResponse.cards[0];
          if (drawResponse.remaining === 0) {
            this.gameOver = true;
          }
        });
      }
    }
  }

  resetGame(): void {
    this.resetGameVariables();
    if (!this.deckService.getDeckId()) {
      this.startGame();
    } else {
      this.fetchNextCard();
    }
  }

  mapCardValueToNumber(value: string): number {
    const values: { [key: string]: number } = {
      'ACE': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'JACK': 11,
      'QUEEN': 12,
      'KING': 13
    };
    return values[value.toUpperCase()];
  }

  
}
