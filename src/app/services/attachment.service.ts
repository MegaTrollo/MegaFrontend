import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private http: HttpClient) {
  }


  submitAtachments() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert('Każdy plik powinnien być mniejszy niż 10MB.');
        return;
      }
    }
    let data = new FormData();
    for (let j = 0; j < this.uploader.queue.length; j++) {

      let fileItem = this.uploader.queue[j]._file;
      data.append('myFile', fileItem, fileItem.name);
    }
    this.sendAtachments(data);
    this.uploader.clearQueue();
  }

  sendAtachments(data: FormData) {
    this.http.post('http://localhost:8080/api/attachment/upload', data).subscribe(res => { console.log(res) });
  }
}
