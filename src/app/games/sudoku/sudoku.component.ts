import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SudokuService } from '../../services/sudoku/sudoku.service';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
    selector: 'app-sudoku',
    standalone: true,
    templateUrl: './sudoku.component.html',
    styleUrl: './sudoku.component.css',
    imports: [NgFor, NgIf, FormsModule, NavbarComponent]
})
export class SudokuComponent implements OnInit{

  board: number[][] = [];
  solution: number[][] = [];
  playerBoard : number[][] = [];
  gameOver: boolean = false;
  gameWon: boolean = false;

  constructor(private sudokuService: SudokuService) {}

  ngOnInit(): void {
    this.fetchSudokuBoard();
  }

  fetchSudokuBoard(): void {
    this.sudokuService.getGrid().subscribe(data => {
      this.board = data.value; // traigo de la api un sudoku incompleto
      this.solution = data.solution; // sudoku resuelto
      this.playerBoard = this.board;
    });
  }

  checkBoard(): void {
    this.gameOver = true;
    this.gameWon = true;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.playerBoard[i][j] !== this.solution[i][j]) { // si en alguna parte el talbero del usuario es distinto del tablero resuelto esta mal
          this.gameWon = false;
        }
      }
    }
  }

  newGame(): void {
    this.gameOver = false;
    this.gameWon = false;
    this.fetchSudokuBoard();
  }

  
  compareBoards(row: number, col: number): boolean {
    return this.board[row][col] !== 0;
  }
  
  completeBoard(){
    this.playerBoard = this.solution;
  }
}

