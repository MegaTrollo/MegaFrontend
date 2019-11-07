import {Component, OnInit} from '@angular/core';
import {Board} from '../../models/Board';
import {ListofBoardsService} from '../../services/listof-boards.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-of-boards',
  templateUrl: './list-of-boards.component.html',
  styleUrls: ['./list-of-boards.component.css']
})
export class ListOfBoardsComponent implements OnInit {
  allBoards: Board[];
  newBoard: Board;

  constructor(private listofBoardsService: ListofBoardsService, private router: Router) {
  }

  ngOnInit() {
    this.listofBoardsService.getAllBoards().subscribe(value => {
      this.allBoards = value;
    }, error1 => {
      console.log(error1.error.message);
    });
  }

  createTable(boardName: string) {
    console.log(boardName);
    this.newBoard = new Board();
    this.newBoard.name = boardName;
    this.listofBoardsService.createNewBoard(this.newBoard).subscribe(value => {
      // this.router.navigate(['list-of-boards']); // TODO: DO ZMIANY NA NOWY KOMPONENT TABLICY
    }, error1 => {
      console.log(error1.error.message);
    });
  }
}
