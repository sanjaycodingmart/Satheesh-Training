import React, { Component } from 'react'
import './signup.css';
import {Link} from 'react-router-dom'
import { Button,Icon} from 'antd';
import * as firebase from "firebase";
class Login extends Component {
    state={
        Username:'',
        Password:''
    };
    onChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })  
    }
    Login=()=>{
        var details=[];
        var flag=0;
        const ref=firebase.database().ref("userdetails")
        ref.on("value",(data)=>{
            for(let i=0;i<data.val().length;i++){
                if(data.val()[i].Username==this.state.Username && data.val()[i].Password==this.state.Password){
                    details=JSON.parse(localStorage.getItem("userdetails"))
                    var data={
                        userid:i,
                        username:data.val()[i].Username
                    }
                    details.push(data);
                    localStorage.setItem('userdetails',JSON.stringify(details))
                    flag=1;
                    break
                }
            else
                flag=0;
                
            }
        })
            if(flag){
                console.log("wrd",this.props.history)
                this.props.history.push({
                    pathname:'/login/insta',
                    state:{
                        Username:this.state.Username
                    }
                });
            }
            else{
                alert("Invalid UserName or Password!!!");
                this.setState({
                    Mobile:'',
                    Password:''  
                });
            }
    }
componentDidMount(){
    const ref=firebase.database().ref("userdetails")
    ref.on("value",(data)=>{
        console.log(data.val())
    })
}
    
    render() {
        return (
            <div className="login-page">
           
                <img src='/instagram_logo.svg.png'className="instagram1" alt='insta'/>
                <div className="form">
                        <input type="text" id="form-input" value={this.state.Username}
                        name="Username" placeholder="Username or Email" onChange={this.onChange}></input>  
                        <input type="password" id="form-input" value={this.state.Password}
                        name="Password" placeholder="Password" onChange={this.onChange}></input>  
                        <div className="button">
                            <Button onClick={this.Login} >Sign In</Button>
                        </div>
                        <h3>OR</h3>
                        <div className="button">
                            <Icon type="facebook" />Login with Facebook
                        </div>
                        <div className="have-account">Don't have an account? 
                                <Link to="/">
                                    <button id="login-button">Signup</button>
                                </Link>
                        </div> 
                </div>
          
            </div>                
        
        )
    }
}
export default Login;