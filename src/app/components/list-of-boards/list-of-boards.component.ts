import {Component, OnInit} from '@angular/core';
import {Board} from '../../models/Board';
import {ListofBoardsService} from '../../services/listof-boards.service';
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

  constructor(private listofBoardsService: ListofBoardsService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.listofBoardsService.getAllBoards(sessionStorage.getItem('accountId')).subscribe(value => {
      this.allBoards = value;
    }, error1 => {
      console.log(error1.error.message);
    });
  }

  createTable(boardName: string) {
    this.newBoard = new Board();
    this.newBoard.name = boardName;
    this.listofBoardsService.createNewBoard(this.newBoard, sessionStorage.getItem('accountId')).subscribe(value => {
    this.toastr.success('Utworzono nową tablicę!');
    this.ngOnInit();
    }, error1 => {
      console.log(error1.error.message);
    });
  }
}
