import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListOfBoardsComponent} from './components/list-of-boards/list-of-boards.component';
import {BoardComponent} from './components/board/board.component';


const routes: Routes = [
  {path: '', redirectTo: 'list-of-boards', pathMatch: 'full'},
  {path: 'list-of-boards', component: ListOfBoardsComponent},
  {path: 'board/:id', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
