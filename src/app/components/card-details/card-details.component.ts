import {Component, OnInit} from '@angular/core';
import {ListOfCardsService} from '../../services/list-of-cards.service';
import {Card} from '../../models/Card';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  constructor(
    private listOfCardsService: ListOfCardsService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }
  card: Card;
  cardId = '';

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

  archiveCard() {
    this.listOfCardsService.archiveCard(this.cardId, 0).subscribe(() => {
      this.toastr.success('Zarchiwizowano kartę!');
    });
  }
}
