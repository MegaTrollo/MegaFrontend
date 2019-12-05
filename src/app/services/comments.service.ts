import { Injectable } from '@angular/core';
import {Board} from '../models/Board';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CommentObj} from '../models/CommentObj';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }



  addNewComment(cardId: string, userId: string,  commentToAdd: CommentObj) {
    return this.http.post(`${environment.backendUrl}/api/comment/addComment/${cardId}/${userId}`, commentToAdd);
  }

  getCommentsByCardId(cardId: string) {
    return this.http.get<CommentObj[]>(`${environment.backendUrl}/api/comment/getCommentByCardId/${cardId}`);
  }

  changeComment(commentId: string, newCommentValue: string) {
  return this.http.post(`${environment.backendUrl}/api/comment/changeComment/${commentId}/${newCommentValue}`, null);
 }

  deleteCommentById(commentId: string) {
    return this.http.delete(`${environment.backendUrl}/api/comment/deleteComment/` + commentId);
  }

}
