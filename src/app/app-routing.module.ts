import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListOfBoardsComponent} from './components/list-of-boards/list-of-boards.component';
import {BoardComponent} from './components/board/board.component';
import {LoginAndRegisterAccountComponent} from './components/login-and-register-account/login-and-register-account.component';
import {CardDetailsComponent} from './components/card-details/card-details.component';
import {ListOfArchivedBoardsComponent} from './components/list-of-archived-boards/list-of-archived-boards.component';


const routes: Routes = [
  {path: '', redirectTo: 'login-register-account', pathMatch: 'full'},
  {path: 'list-of-boards', component: ListOfBoardsComponent},
  {path: 'list-of-archived-boards', component: ListOfArchivedBoardsComponent},
  {path: 'board/:id', component: BoardComponent},
  {path: 'login-register-account', component: LoginAndRegisterAccountComponent},
  {path: 'card-details/:cardId', component: CardDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
