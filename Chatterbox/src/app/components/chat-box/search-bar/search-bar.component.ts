import { Component, OnInit } from '@angular/core';
import { ChattingService } from '../../../service/chatting.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  user={
    username:''
  }
  messages;
  friends;
  chats;
  group:any;
  constructor(private chat:ChattingService,private router:Router) { }

  async ngOnInit() {
    if(!localStorage.getItem('userDetails')){
      this.router.navigate(['/signin']);
    }
    this.chat.allChats().subscribe(data=>{
      this.chats=data;
      // console.log(this.chats)
      if(this.chats==401){
        localStorage.removeItem('userDetails')
        this.router.navigate(['/signin'])
      }
    })
    await this.getGroup();
  }
  getGroup=()=>{
    this.chat.getGroup().subscribe(data=>{
      // this.chats.push(data);
      this.group=data;
      console.log('dddddddd===>',data)
    })
  }
  onChange=async(event)=>{
    this.user.username=event.target.value
      if(!(event.target.value=='')){
        await this.chat.Chat(this.user).subscribe(data=>{
          this.friends=data;
          if(this.friends==401){
            localStorage.removeItem('userDetails')
            this.router.navigate(['/signin'])
          }
        })
    }

  }

}
