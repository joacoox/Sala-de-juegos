import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  private apiUrl = 'https://sudoku-api.vercel.app/api/dosuku';
  
  constructor(private http: HttpClient) { }

  getGrid(): Observable<{ value: number[][], solution: number[][] }> {
    return this.http.get<{ newboard: { grids: { value: number[][], solution: number[][] }[] } }>(this.apiUrl).pipe(
      map(response => response.newboard.grids[0])
    );
  }
}
