import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http:HttpClient) { }
  Signin=(user)=>{
    return this.http.post('http://localhost:5003/login',user)
  }
}
