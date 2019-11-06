import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponentComponent} from './components/test-component/test-component.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'test', component: TestComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
