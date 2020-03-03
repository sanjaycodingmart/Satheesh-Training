import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ChattingService } from 'src/app/service/chatting.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {

  chats;
  name: any;
  users = []

  constructor(public dialogRef: MatDialogRef<DialogComponentComponent>, private chat: ChattingService, private router: Router) { }

  ngOnInit(): void {
    this.chat.allChats().subscribe(data => {
      this.chats = data;
      console.log(this.chats)
      if (this.chats == 401) {
        localStorage.removeItem('userDetails')
        this.router.navigate(['/signin'])
      }
    })
  }

  submit() {
    this.chat.creategroup(this.name,this.users).subscribe(data=>{
      console.log(data)
    })
  }

  addToGroup = (id) => {
    if (!this.users.includes(id))
      this.users.push(id)
    else
      this.users.splice(this.users.indexOf(id), 1)
  }
}
