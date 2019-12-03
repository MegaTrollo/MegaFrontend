import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board} from '../models/Board';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListofBoardsService {

  constructor(private http: HttpClient) {
  }

  getAllBoards(accountId: string) {
    return this.http.get<Board[]>(`${environment.backendUrl}/api/table/allbyUserId/` + accountId);
  }

  createNewBoard(newBoard: Board, accountId: string) {
    return this.http.post(`${environment.backendUrl}/api/table/add/` + accountId, newBoard);
  }

  getBoardById(boardId: string) {
    return this.http.get<Board>(`${environment.backendUrl}/api/table/` + boardId);
  }

  changeBoardNameById(boardId: string, newBoardName: string) {
    return this.http.post(`${environment.backendUrl}/api/table/rename/${boardId}/${newBoardName}`, null);
  }

}
