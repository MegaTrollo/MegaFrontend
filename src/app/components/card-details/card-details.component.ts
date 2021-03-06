import {Component, OnInit} from '@angular/core';
import {ListOfCardsService} from '../../services/list-of-cards.service';
import {Card} from '../../models/Card';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommentsService} from '../../services/comments.service';
import {CommentObj} from '../../models/CommentObj';
import {HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  constructor(
    private listOfCardsService: ListOfCardsService,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
  }

  card: Card;
  comments: CommentObj[];
  cardId = '';
  accountId;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  pathToCard: string;
  jwtToken: string;

  ngOnInit() {
    this.card = new Card();
    this.cardId = this.route.snapshot.paramMap.get('cardId');
    this.accountId = sessionStorage.getItem('accountId');
    this.listOfCardsService.getCardById(this.cardId).subscribe(value => {
      this.card = value;
    });
    this.commentsService.getCommentsByCardId(this.cardId).subscribe(value => {
      this.comments = value;
    });

    this.pathToCard = window.location.href;
    this.jwtToken = sessionStorage.getItem('jwtToken');
  }

  changeCardDescription(event) {
    const descriptionToSet = event.target.value;
    this.listOfCardsService.changeCardDescById(this.cardId, descriptionToSet).subscribe(value => {
      this.toastr.success('Zmieniono opis');
    });
  }

  archiveCard() {
    this.listOfCardsService.archiveCard(this.cardId, 0).subscribe(() => {
      this.toastr.success('Zarchiwizowano kartę!');
    });
  }

  addComment(commentValue) {
    const comment = new CommentObj();
    comment.comment = commentValue;
    this.commentsService.addNewComment(this.cardId, this.accountId, comment).subscribe(value => {
      this.toastr.success('Dodano nowy komentarz');
      this.ngOnInit();
    });
  }

  changeComent(event, comment: CommentObj) {
    const newCommentValue = event.target.value;
    const commentId = comment.id.toString();
    this.commentsService.changeComment(commentId, newCommentValue).subscribe(value => {
      this.toastr.success('Komentarz został zedytowany');
    });
  }

  deleteComment(id: number) {
    const commentId = id.toString();
    this.commentsService.deleteCommentById(commentId).subscribe(value => {
      this.toastr.success('Komentarz został usunięty');
      this.ngOnInit();
    });
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

    data.append('card', new Blob([JSON.stringify(this.card)],
      {
        type: 'application/json'
      }), 'card');
    console.log(this.card);
    this.sendAtachments(data);
    this.uploader.clearQueue();
  }

  sendAtachments(data: FormData) {
    console.log(data);
    this.http.post('http://localhost:8080/api/attachment/upload', data).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    });
  }

  copyPathToClipboard(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    this.toastr.success('Skopiowano link!');
  }
}
