import {Component, OnInit} from '@angular/core';
import {CardList} from '../../models/CardList';
import {ListOfCardListService} from '../../services/list-of-card-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Board} from '../../models/Board';
import {ListOfBoardsService} from '../../services/list-of-boards.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Card} from '../../models/Card';
import {ListOfCardsService} from '../../services/list-of-cards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(
    private listOfCardListService: ListOfCardListService,
    private listOfBoardsService: ListOfBoardsService,
    private listOfCardsService: ListOfCardsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  allCardLists: CardList[];
  boardId: string;
  thisBoard: Board;
  boardName = '';
  listOfCardsToAdd: CardList;
  mapOfCardsAtThisBoard = new Map();
  newListOfCardsNameForm = new FormGroup({
    newListOfCardsName: new FormControl('')
  });
  newCardForm = new FormGroup({
    newCardName: new FormControl('')
  });
  jwtToken: string;


  ngOnInit() {
    this.jwtToken = sessionStorage.getItem('jwtToken');
    this.boardId = this.route.snapshot.paramMap.get('id');
    this.listOfBoardsService.getBoardById(this.boardId).subscribe(value => {
      this.thisBoard = value;
      this.boardName = this.thisBoard.name;
    }, error1 => {
      console.log(error1.error.message);
    });
    this.listOfCardListService.getAllCardListByBoardId(this.boardId).subscribe(value => {
        this.allCardLists = value;
        for (const cardList of this.allCardLists) {
          this.listOfCardsService.getAllCardsByCardListId(cardList.id).subscribe(value2 => {
              this.mapOfCardsAtThisBoard.set(cardList.id, value2);
            },
            error1 => {
              console.log(error1.error.message);
            }
          );
        }
        console.log(this.mapOfCardsAtThisBoard);
      },
      error1 => {
        console.log(error1.error.message);
      });

  }


  changeBoardName(event) {
    const nameToSet = event.target.value;
    console.log(event.target.value);
    this.listOfBoardsService.changeBoardNameById(this.boardId, nameToSet).subscribe(
      value => {
        this.toastr.success('Zmieniono nazwę tablicy!');
      }, error1 => {
        console.log(error1.error.message);
      });

  }


  addNewListOfCards() {
    this.listOfCardsToAdd = new CardList();
    this.listOfCardsToAdd.name = this.newListOfCardsNameForm.value.newListOfCardsName;
    this.listOfCardListService.addListOfCardsByBoardId(this.boardId, this.listOfCardsToAdd).subscribe(value => {
      this.toastr.success('Utworzono nową listę!');
      this.ngOnInit();
      this.newListOfCardsNameForm.reset();
    });
  }

  addNewCardToCardListById(cardListId: number) {
    const tempCard = new Card();
    tempCard.name = this.newCardForm.value.newCardName;
    this.listOfCardsService.addCardByCardListId(cardListId, tempCard).subscribe(value => {
      this.toastr.success('Dodano nową kartę');
      this.ngOnInit();
      this.newCardForm.reset();
    });
  }

  deleteCardById(cardId: any) {
    console.log('DeleteCard: ' + cardId);

    this.listOfCardsService.deleteCardByCardId(cardId).subscribe(value => {
      this.toastr.success('Usunięto kartę');
      this.ngOnInit();
      this.newCardForm.reset();
    });
  }

  archiveBoard() {
    this.listOfBoardsService.changeArchiveBoardStatus(this.boardId, true).subscribe(() => {
      this.toastr.success('Zarchiwizowano tablicę!');
      this.router.navigate(['list-of-boards']);
    }, error1 => console.log(error1.error.message));
  }

  deleteBoard() {
    this.listOfBoardsService.deleteBoardByBoardId(this.boardId).subscribe(() => {
      this.toastr.success('Usunięto tablicę!');
      this.router.navigate(['list-of-boards']);
      this.ngOnInit();
    }, error1 => {
      console.log(error1.error.message);
    });
  }

  unarchiveBoard() {
    this.listOfBoardsService.changeArchiveBoardStatus(this.boardId, false).subscribe(() => {
      this.toastr.success('Odarchiwizowano tablicę!');
      this.router.navigate(['list-of-boards']);
      this.ngOnInit();
    }, error1 => {
      console.log(error1.error.message);
    });
  }
}
