import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../service/signup.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  user = {
    name: "",
    email: "",
    username: "",
    mobile: "",
    password: ""
  }
  register;

  constructor(private signup:SignupService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('userDetails')){
      this.router.navigate(['/chats'])
    }
  }
  onSubmit=async()=> {
    console.log(this.user)
    if(this.user.name==""||this.user.email==""||this.user.mobile==""||this.user.password==""|| this.user.username==""){
      alert('please fill the details')
    }
    else{
      await this.signup.Signup(this.user).subscribe(data=>{
        this.register=data
        console.log(this.register)
        if(this.register.errors){
            alert('Username is already taken')
        }
        else{
          localStorage.setItem('userDetails',this.register.token)
          this.router.navigate(['/chats'])
        }
      });
    }
   
    this.clear()
  }
  clear=()=>{
    this.user={
      name: "",
      email: "",
      username: "",
      mobile: "",
      password: ""
    }
  }
}
