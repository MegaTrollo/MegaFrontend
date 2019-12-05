import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ListOfBoardsComponent} from './components/list-of-boards/list-of-boards.component';
import {BoardComponent} from './components/board/board.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpHeaderInterceptor} from './HttpHeaderInterceptor';
import {LoginAndRegisterAccountComponent} from './components/login-and-register-account/login-and-register-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardDetailsComponent} from './components/card-details/card-details.component';
import {ListOfArchivedBoardsComponent} from './components/list-of-archived-boards/list-of-archived-boards.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListOfBoardsComponent,
    BoardComponent,
    LoginAndRegisterAccountComponent,
    CardDetailsComponent,
    ListOfArchivedBoardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true
    })
  ],
  providers: [{provide: HttpHeaderInterceptor, useClass: HttpHeaderInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
