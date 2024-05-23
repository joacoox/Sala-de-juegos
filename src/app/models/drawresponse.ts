import { Card } from "./card";

export interface DrawResponse {
    success: boolean;
    deck_id: string;
    cards: Card[];
    remaining: number;
  }