import {Component, OnInit} from '@angular/core';
import {Board} from '../../models/Board';
import {ListOfBoardsService} from '../../services/list-of-boards.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-of-boards',
  templateUrl: './list-of-boards.component.html',
  styleUrls: ['./list-of-boards.component.css']
})
export class ListOfBoardsComponent implements OnInit {
  allBoards: Board[];
  newBoard: Board;

  constructor(private listOfBoardsService: ListOfBoardsService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.listOfBoardsService.getAllVisibleBoards(sessionStorage.getItem('accountId')).subscribe(value => {
      this.allBoards = value;
    }, error1 => {
      console.log(error1.error.message);
    });
  }

  createTable(boardName: string) {
    this.newBoard = new Board();
    this.newBoard.name = boardName;
    this.listOfBoardsService.createNewBoard(this.newBoard, sessionStorage.getItem('accountId')).subscribe(value => {
    this.toastr.success('Utworzono nową tablicę!');
    this.ngOnInit();
    }, error1 => {
      console.log(error1.error.message);
    });
  }
}
