import {Component, OnInit} from '@angular/core';
import {ListOfCardsService} from '../../services/list-of-cards.service';
import {Card} from '../../models/Card';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CommentsService} from '../../services/comments.service';
import {CommentObj} from '../../models/CommentObj';

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
    private toastr: ToastrService
  ) {
  }
  card: Card;
  comments: CommentObj[];
  cardId = '';
  accountId;

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

  addComment(commentValue){
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
}
