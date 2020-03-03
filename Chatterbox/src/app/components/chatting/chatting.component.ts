import { Component, OnInit } from '@angular/core';
import { ChattingService } from '../../service/chatting.service'
import { Router, ActivatedRoute } from '@angular/router'
// import { Socket } from 'ngx-socket-io';
import { SocketioService } from 'src/app/socketio.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {
  public user: any;
  public id: any;
  Rec: any;
  Messages = [];

  constructor(private name: ChattingService, private router: Router,
    private activatedRoute: ActivatedRoute, private SocketioService: SocketioService) { }

  ngOnInit(): void {
    this.getName();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id ? params.id : undefined
      if (this.id)
        this.Receiver();
    })
  }
  Receiver = () => {
    this.name.Recvrdetails(this.id).subscribe(data => {
      this.Rec = data[0];
    })
  }
  getName = async () => {
    await this.name.ChatterBox(localStorage.getItem('userDetails')).subscribe(data => {
      this.user = data[0];
    })
  }

}
