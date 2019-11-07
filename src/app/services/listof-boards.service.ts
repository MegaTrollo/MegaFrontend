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

  getAllBoards() {
    return this.http.get<Board[]>(`${environment.localhostBackendUrl}/api/table/all`);
  }

  createNewBoard(newBoard: Board) {
    return this.http.post(`${environment.localhostBackendUrl}/api/table/add`, newBoard);
  }

  getBoardById(boardId: string) {
    return this.http.get<Board>(`${environment.localhostBackendUrl}/api/table/` + boardId);
  }

  changeBoardNameById(boardId: string, newBoardName: string) {
    return this.http.post(`${environment.localhostBackendUrl}/api/table/rename/${boardId}/${newBoardName}`, null);
  }

}
