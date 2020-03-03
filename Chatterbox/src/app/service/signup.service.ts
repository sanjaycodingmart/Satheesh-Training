import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }
  Signup=(user)=>{
    return this.http.post("http://localhost:5003/signup",user)
  }
}
