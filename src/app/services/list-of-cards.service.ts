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
}
