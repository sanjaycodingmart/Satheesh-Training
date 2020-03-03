import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketioService {
  messages = [];
  private url = 'http://localhost:5003/';
  private socket;
  constructor() {
  }

  connect = (id) => {
    let _url = this.url + id
    this.socket = io(_url)
  }
  sendMessage = (data) => {
    return this.socket.emit('insert_to_message', {
      message: data.msg,
      senderid: data.usrId,
      receiverid: data.recvId
    })
  }

  getMessages = () => {
    return Observable.create((observer) =>
      this.socket.on('send_message', (data) => {
        observer.next(data)
      }));
  }

  sendgrpMessage=(userid,message,usergroup,groupid,username)=>{
    return this.socket.emit('insert_to_group_message',{
      senderid:userid,
      message:message,
      usergroup:usergroup,
      groupid:groupid,
      username:username
    })
  }
  getgrpMessages=()=>{
    return Observable.create((observer)=>{
      this.socket.on('send_group_message',(data)=>{
        observer.next(data)
      })
    })
  }
}
