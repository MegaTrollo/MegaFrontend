import { Injectable } from '@angular/core';
import {Board} from '../models/Board';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Label} from '../models/Label';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private http: HttpClient) { }

  addLabelToCard(cardId: string, label: Label) {
    return this.http.post(`${environment.backendUrl}/api/label/addLabel/` + cardId, label);
  }
}
