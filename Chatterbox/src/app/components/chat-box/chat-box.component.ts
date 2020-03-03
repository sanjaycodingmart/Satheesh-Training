import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SocketioService } from '../../socketio.service';

import { ChattingService } from 'src/app/service/chatting.service';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {

  @Input() user: any
  @Input() userId: any

  message: '';
  messages;
  grpmessages;
  grpname:any;
  recid: any;
  data: any;
  type: any;
  usergroup:any=[];
  grpid:any;

  constructor(private router: ActivatedRoute, private socketService: SocketioService, private chat: ChattingService) {
    router.url.subscribe(async (params) => {
      if (params) {
        this.type = params[0].path
        if(this.type=='chats'){
          this.chat.getChats(params[1].path, params[0].path).subscribe(data => {
            this.messages = data;
          })
        }
        else if(this.type=='groups'){
              this.grpid=params[1].path
              this.chat.groupuserlist(params[1].path).subscribe(data=>{
              data.forEach(element => {
                  this.grpname=element['Group'].Name
                  this.usergroup.push(element['UserId'])
                });
              })
              this.chat.getChats(params[1].path, params[0].path).subscribe(data => {
                console.log('object',data)
                this.grpmessages = data;
                // console.log('grpmsg->',this.grpmessages)
              })
          }
      }
      let uId
      await this.chat.ChatterBox(localStorage.getItem('userDetails')).subscribe(data => {
        uId = data[0].id;
        console.log('uId',uId)
        if (!uId) return
        socketService.connect(uId)
        this.socketService.getMessages().subscribe((data) => {
          console.log(data, this.messages)
          this.messages.push(data)
        })
        this.socketService.getgrpMessages().subscribe((data)=>{
          console.log(data,this.grpmessages)
          this.grpmessages.push({ UserId:data.UserId ,Message:data. Message,Usergroup:data.Usergroup,User:{username:data.username}})
          // this.grpmessages.push(data);
        })
      })


    });
  }
  sendMessage = async (recid, usrid) => {
    this.data = {
      msg: this.message,
      recvId: recid,
      usrId: usrid
    }
    if (!(this.message == "")) {
      await this.socketService.sendMessage(this.data)
      this.messages.push({ senderId: usrid, ReceiverId: recid, Messages: this.message })
      this.message = ""
    }
  }
  sendgrpMessage=async(username,userid)=>{
    console.log('object',username)
    if(!(this.message == "")){
      await this.socketService.sendgrpMessage(userid,this.message,this.usergroup,this.grpid,username)
      this.grpmessages.push({ UserId:userid ,Message:this.message,Usergroup:this.usergroup,User:{username:username}})
    }
    this.message=""
  }
}
