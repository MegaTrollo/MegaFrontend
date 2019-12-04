import { Component, OnInit } from '@angular/core';
import { ListOfCardsService } from '../../services/list-of-cards.service';
import { Card } from '../../models/Card';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { AttachmentService } from '../../services/attachment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  constructor(
    private listOfCardsService: ListOfCardsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,

    private http: HttpClient
  ) {
  }
  card: Card;
  cardId = '';
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  ngOnInit() {
    this.card = new Card();
    this.cardId = this.route.snapshot.paramMap.get('cardId');
    this.listOfCardsService.getCardById(this.cardId).subscribe(value => {
      this.card = value;
    });
  }

  changeCardDescription(event) {
    const descriptionToSet = event.target.value;
    this.listOfCardsService.changeCardDescById(this.cardId, descriptionToSet).subscribe(value => {
      this.toastr.success('Zmieniono opis');
    });
  }


  onSubmit() {
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

    data.append('card', new Blob([JSON.stringify(this.card)],
      {
        type: "application/json"
      }), 'card');
      console.log(this.card)
    this.sendAtachments(data);
    this.uploader.clearQueue();
  }

  sendAtachments(data: FormData) {
    console.log(data);
    this.http.post('http://localhost:8080/api/attachment/upload', data).subscribe(res => { console.log(res) });
  }

}
