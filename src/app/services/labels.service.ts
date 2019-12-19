import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Label} from '../models/Label';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  constructor(private http: HttpClient) {
  }

  addLabelToCard(cardId: string, label: Label) {
    return this.http.post(`${environment.backendUrl}/api/label/addLabel/` + cardId, label);
  }

  getLabelByLabelId(labelId: string) {
    return this.http.get<Label>(environment.backendUrl + '/api/label/getLabel/' + labelId);
  }

  editLabel(label: Label) {
    return this.http.post(environment.backendUrl + '/api/label/editLabel', label);
  }

  deleteLabel(labelId: string) {
    return this.http.delete(environment.backendUrl + '/api/label/deleteLabelById/' + labelId);
  }
}
