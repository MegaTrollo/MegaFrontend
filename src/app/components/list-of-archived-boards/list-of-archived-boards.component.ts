import {Component, OnInit} from '@angular/core';
import {ListOfBoardsService} from '../../services/list-of-boards.service';
import {Board} from '../../models/Board';

@Component({
  selector: 'app-list-of-archived-boards',
  templateUrl: './list-of-archived-boards.component.html',
  styleUrls: ['./list-of-archived-boards.component.css']
})
export class ListOfArchivedBoardsComponent implements OnInit {

  allBoards: Board[];

  constructor(private listOfBoardsService: ListOfBoardsService) {
  }

  ngOnInit() {
    this.listOfBoardsService.getAllArchivedBoards(sessionStorage.getItem('accountId')).subscribe(value => {
      this.allBoards = value;
    }, error1 => {
      console.log(error1.error.message);
    });
  }

}
