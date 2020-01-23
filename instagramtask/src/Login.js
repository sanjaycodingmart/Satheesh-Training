import React, { Component } from 'react'
import './signup.css';
import {Link} from 'react-router-dom'
import { Button,Icon} from 'antd';
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
        fetch(`http://localhost:8080/login?username=${this.state.Username}&password=${this.state.Password}`)
            .then(response=>response.json())
                .then((data)=>{
                    console.log(data)
                    if(data.status){
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