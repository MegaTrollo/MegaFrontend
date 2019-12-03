import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CardList} from '../models/CardList';

@Injectable({
  providedIn: 'root'
})
export class ListOfCardListService {

  constructor(private http: HttpClient) {
  }

  getAllCardListByBoardId(boardId: string) {
    return this.http.get<CardList[]>(`${environment.backendUrl}/api/cardList/getAllCardListByBoardId/` + boardId);
  }

  addListOfCardsByBoardId( boardId: string, listOfCardsToAdd: CardList) {
    return this.http.post(`${environment.backendUrl}/api/cardList/addListCard/` + boardId, listOfCardsToAdd);
  }
}
