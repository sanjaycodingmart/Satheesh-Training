import React, { Component } from 'react'
import './signup.css';
import { Link } from 'react-router-dom'
import { Button, Icon } from 'antd';
import Axios from 'axios';
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
    Login = () => {
        Axios.post('http://localhost:5003/login', {
                username: this.state.Username,
                password: this.state.Password
        }).then((data => {
            localStorage.setItem('userDetails',data.data.id)
            if (data.data) {
                this.props.history.push('/login/insta');
            }
            else {
                alert("Invalid UserName or Password!!!");
                this.setState({
                    Username: '',
                    Password: ''
                });
            }
        }))

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