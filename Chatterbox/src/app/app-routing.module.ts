import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import {  ChattingComponent } from './components/chatting/chatting.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component:SignupComponent },
  { path: 'signin',component:SigninComponent},
  {path:'chats/:id', component: ChattingComponent},
  {path:'chats', component: ChattingComponent} ,
  {path:'groups/:id',component:ChattingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
