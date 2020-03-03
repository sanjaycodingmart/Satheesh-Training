import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { ChattingComponent } from './components/chatting/chatting.component'
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { MesageBoxComponent } from './components/mesage-box/mesage-box.component';
import { SearchBarComponent } from './components/chat-box/search-bar/search-bar.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
// import { SocketIoModule , SocketIoConfig} from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { DialogComponentComponent } from './components/dialog-component/dialog-component.component';
import { GroupchattingcomponentComponent } from './components/groupchattingcomponent/groupchattingcomponent.component';

// const config: SocketIoConfig = { url: 'http://localhost:5003', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ChattingComponent,
    ChatBoxComponent,
    MesageBoxComponent,
    SearchBarComponent,
    UserprofileComponent,
    DialogComponentComponent,
    GroupchattingcomponentComponent
  ],
  entryComponents:[DialogComponentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    // SocketIoModule.forRoot(config)
   
  ],
  // providers: [SocketioService],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
