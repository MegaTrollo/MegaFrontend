import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Board} from '../models/Board';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListOfBoardsService {

  constructor(private http: HttpClient) {
  }

  getAllVisibleBoards(accountId: string) {
    return this.http.get<Board[]>(`${environment.backendUrl}/api/table/allVisiblebyUserId/` + accountId);
  }

  getAllArchivedBoards(accountId: string) {
    return this.http.get<Board[]>(`${environment.backendUrl}/api/table/allArchivedbyUserId/` + accountId);
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

  changeArchiveBoardStatus(boardId: string, isArchived: boolean) {
    return this.http.post(environment.backendUrl + '/api/table/changeArchiveStatus/' + boardId + '/' + isArchived, '');
  }

  deleteBoardByBoardId(boardId: string) {
    return this.http.post(environment.backendUrl + '/api/table/delete/' + boardId, '');
  }
}
