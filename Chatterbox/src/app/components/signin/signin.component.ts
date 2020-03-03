import { Component, OnInit } from '@angular/core';
import { SigninService } from '../../service/signin.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private signin:SigninService,private router:Router) { }
  user={
    email:'',
    password:''
  }
  login;
  ngOnInit(): void {
    if(localStorage.getItem('userDetails')){
      this.router.navigate(['/chats']);
    }
    
  }
  onSubmit=async()=>{
    console.log(this.user)
    if(this.user.email==''||this.user.password==''){
      alert('Please Fill the details');
    }
    else{
      await this.signin.Signin(this.user).subscribe(data=>{
        this.login=data;
        if(this.login.errors){
          alert('Invalid Username and Password')
        }
        else{
          localStorage.setItem('userDetails',this.login.token)
          this.router.navigate(['/chats']);
        }
      })
    }

  }
}
