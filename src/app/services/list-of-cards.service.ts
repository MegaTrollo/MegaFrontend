import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Card} from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class ListOfCardsService {

  constructor(private http: HttpClient) { }

  getAllCardsByCardListId(cardListId: number) {
    return this.http.get<Card[]>(`${environment.backendUrl}/api/card/getAllCardByCardListId/` + cardListId);
  }

  addCardByCardListId(cardListId: number, cardToAdd: Card) {
    return this.http.post(`${environment.backendUrl}/api/card/addCard/` + cardListId, cardToAdd);
  }


  deleteCardByCardId(cardId: any) {
    return this.http.delete(`${environment.backendUrl}/api/card/deleteCard/` + cardId);
  }

  getCardById(cardId: string) {
    return this.http.get<Card>(`${environment.backendUrl}/api/card/getCardById/` + cardId);
  }

  changeCardDescById(cardId: string, description: string){
    return this.http.post(`${environment.backendUrl}/api/card/changeDesc/` + cardId + `/` + description, null );
  }
}
