import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board} from '../models/Board';
import {environment} from '../../environments/environment';
import {CardList} from '../models/CardList';

@Injectable({
  providedIn: 'root'
})
export class ListOfCardListService {

  constructor(private http: HttpClient) {
  }

  getAllCardListByBoardId(boardId: string) {
    return this.http.get<CardList[]>(`${environment.localhostBackendUrl}/api/card/getAllCardListByBoardId/` + boardId);
  }

}
