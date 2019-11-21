import {Component, OnInit} from '@angular/core';
import {CardList} from '../../models/CardList';
import {ListOfCardListService} from '../../services/list-of-card-list.service';
import {ActivatedRoute} from '@angular/router';
import {Board} from '../../models/Board';
import {ListofBoardsService} from '../../services/listof-boards.service';
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
    private listOfBoardsService: ListofBoardsService,
    private listOfCardsService: ListOfCardsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {
  }

  allCardLists: CardList[];
  tempCardsList: Card[];
  boardId: string;
  thisBoard: Board;
  boardName = '';
  listOfCardsToAdd: CardList;
  mapOfCardsAtThisBoard = new Map();
  newListOfCardsNameForm = new FormGroup({
    newListOfCardsName: new FormControl('')
  });


  ngOnInit() {
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

      }, error1 => {
        console.log(error1.error.message);
      });

  }


  addNewListOfCards() {
    this.listOfCardsToAdd = new CardList();
    this.listOfCardsToAdd.name = this.newListOfCardsNameForm.value.newListOfCardsName;
    this.listOfCardListService.addListOfCardsByBoardId(this.boardId, this.listOfCardsToAdd).subscribe(value => {
      this.toastr.success('Utworzono nową tablicę!');
      this.ngOnInit();
      this.newListOfCardsNameForm.reset();
    });
  }
}
