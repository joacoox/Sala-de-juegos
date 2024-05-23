import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../../models/card';
import { Observable } from 'rxjs';
import { DeckResponse } from '../../models/deckresponse';
import { DrawResponse } from '../../models/drawresponse';

@Injectable({
  providedIn: 'root'
})
export class MayoromenorService {

  private baseUrl = 'https://deckofcardsapi.com/api/deck';
  private deckId: string = '';

  constructor(private http: HttpClient) {}

  // Mezcla el mazo y obtiene un deck_id
  shuffleDeck(deckCount: number = 1): Observable<DeckResponse> {
    return this.http.get<DeckResponse>(`${this.baseUrl}/new/shuffle/?deck_count=${deckCount}`);
  }

  // Dibuja cartas del mazo utilizando el deck_id
  drawCards(count: number): Observable<DrawResponse> {
    if (!this.deckId) {
      throw new Error('Deck ID is not set. Shuffle the deck first.');
    }
    return this.http.get<DrawResponse>(`${this.baseUrl}/${this.deckId}/draw/?count=${count}`);
  }

  // Establece el deck_id
  setDeckId(deckId: string): void {
    this.deckId = deckId;
  }

  // Devuelve el deck_id actual
  getDeckId(): string {
    return this.deckId;
  }
}
