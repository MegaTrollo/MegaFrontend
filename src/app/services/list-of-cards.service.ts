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
    return this.http.get<Card[]>(`${environment.localhostBackendUrl}/api/card/getAllCardByCardListId/` + cardListId);
  }

  addCardByCardListId(cardListId: number, cardToAdd: Card) {
    return this.http.post(`${environment.localhostBackendUrl}/api/card/addCard/` + cardListId, cardToAdd);
  }


  deleteCardByCardId(cardId: any) {
    return this.http.delete(`${environment.localhostBackendUrl}/api/card/deleteCard/` + cardId);
  }

  getCardById(cardId: string) {
    return this.http.get<Card>(`${environment.localhostBackendUrl}/api/card/getCardById/` + cardId);
  }

  changeCardDescById(cardId: string, description: string){
    return this.http.post(`${environment.localhostBackendUrl}/api/card/changeDesc/` + cardId + `/` + description, null );
  }
}
