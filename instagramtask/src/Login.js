import React, { Component } from 'react'
import './signup.css';
import { Link } from 'react-router-dom'
import { Button, Icon, message } from 'antd';
import Axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
class Login extends Component {
    state = {
        Username: '',
        Password: ''
    };
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    responseGoogle = (response) => {
        console.log(response);
        Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.Zi.id_token}`)
            .then((data)=>{
                console.log(data)
                var username=data.data.given_name
                Axios.get(`http://localhost:5003/googlelogin?username=${username}`)
                .then((data=>{
                    if(data.data){
                        localStorage.setItem('userDetails',data.data.id)
                        localStorage.setItem('loginTime',Date.now())
                        this.props.history.push('/insta');
                    }
                    else{
                         message.error("Invalid UserName or Password!!!");
                    }
                }))
            })
    }
    responseFacebook=(response)=>{
            var username=response.name
            Axios.get(`http://localhost:5003/googlelogin?username=${username}`)
            .then((data)=>{
                console.log(data)
                if(data.data){
                    localStorage.setItem('userDetails',data.data.id)
                    this.props.history.push('/insta');
                }
                else{
                     message.error("Invalid UserName or Password!!!");
                }
            })
    }
    Login = () => {
        if(this.state.Username==="" &&this.state.Password===""){
            message.error('please enter the username and password!!!')
        }
        else{
        Axios.post('http://localhost:5003/login', {
                username: this.state.Username,
                password: this.state.Password
        }).then((data => {
            console.log(data)
            if (data.data) {
                console.log(data)
                localStorage.setItem('userDetails',data.data.token)
                this.props.history.push('/insta');
            }
            else {
                message.error("Invalid UserName or Password!!!");
                this.setState({
                    Username: '',
                    Password: ''
                });
            }
        }))
    }
    }
    render() {
        return (
            <div className="login-page">
                <img src='/instagram_logo.svg.png' className="instagram1" alt='insta' />
                <div className="form">
                    <input type="text" className="form-input1" value={this.state.Username}
                        name="Username" placeholder="Username or Email" onChange={this.onChange}></input>
                    <input type="password" className="form-input1" value={this.state.Password}
                        name="Password" placeholder="Password" onChange={this.onChange}></input>
                    <div className="button">
                        <Button onClick={this.Login} >Sign In</Button>
                    </div>
                    <h3>OR</h3>
                    <div style={{marginBottom:'20px',marginLeft:'20px'}}>
                        <GoogleLogin
                                clientId="393679722637-m0hhipqi6tepegljck59o2vomim5jacr.apps.googleusercontent.com"
                                render={renderProps => (
                                <button  style={{background:'none',border:'none'}}
                                        onClick={renderProps.onClick} 
                                        disabled={renderProps.disabled}> 
                                       <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"alt='img' style={{height:'20px'}}/><span style={{color:'blue',marginLeft:'10px'}}>Login with Google</span>
                                </button>
                                )}
                                buttonText="Login"
                                onSuccess={this.responseGoogle} 
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                    </div>
                    
                            {/* <FacebookLogin
                                    appId="610082599778961"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    onSuccess={this.responseFacebook}
                                    icon={<Icon type="facebook" />}
                                /> */}
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