import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ChattingService {

  constructor(private http: HttpClient) { }
  Chat = (user) => {
    return this.http.get(`http://localhost:5003/usernames?token=${localStorage.getItem('userDetails')}&username=${user.username}`)
  }
  ChatterBox = (token) => {
    return this.http.get(`http://localhost:5003/name?token=${token}`)
  }
  Recvrdetails = (id) => {
    return this.http.get(`http://localhost:5003/details?id=${id}`)
  }
  allChats = () => {
    return this.http.get(`http://localhost:5003/allchats`, {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('userDetails')
      })
    })
  }
  getChats = (recvid, type) => {
    if (type == 'chats') {
      return this.http.get(`http://localhost:5003/getchats?recid=${recvid}`,
        {
          headers: new HttpHeaders({
            "Authorization": localStorage.getItem('userDetails')
          })
        }
      )
    }
    else if(type=='groups') {
      console.log('-------->',recvid)
      return this.http.get(`http://localhost:5003/getgroupchats?grpid=${recvid}`, {
          headers: new HttpHeaders({
            "Authorization": localStorage.getItem('userDetails')
          })
       })
    }
  }
  creategroup = (name, addid) => {
    return this.http.post('http://localhost:5003/addgroup',
      {
        addid, name
      },
      {
        headers: new HttpHeaders({
          "Authorization": localStorage.getItem('userDetails')
        })
      })
  }
  getGroup = () => {
    return this.http.get('http://localhost:5003/getgroup', {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('userDetails')
      })
    })
  }
  groupuserlist = (id) => {
    return this.http.get<Object[]>(`http://localhost:5003/getuseringroup?id=${id}`,{
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('userDetails')
      })
    })
  }
}

