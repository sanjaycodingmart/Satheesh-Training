import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './signup.css';
import { Icon } from 'antd'
import Axios from 'axios';
class Signup extends Component {
 constructor(props){
     super(props)
     console.log(props)
     if(localStorage.getItem('userDetails')){
        props.history.push('/login/insta') 
     }
 }
    state = {
        Name: '',
        Mobile: '',
        Username: '',
        Password: '',
        Email: ''
    };
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    OnSubmit = () => {
        var flag = true;
        var b = [this.state.Mobile, this.state.Name, this.state.Username, this.state.Password, this.state.Email];
        var body = {
            username: this.state.Username,
            name: this.state.Name,
            mobile: this.state.Mobile,
            email: this.state.Email,
            Password: this.state.Password
        }

        b.forEach((element) => {
            if (!element)
                flag = false
        })  
        if (flag)
            Axios.post('http://localhost:5003/signup', {
                body
            }).then((data) => {
                console.log(data)
                if (!data.data.errors) {
                    this.setState({ Name: '', Mobile: '', Username: '', Password: '', Email: '' });
                    localStorage.setItem('userDetails',data.data.id)
                    this.props.history.push('/login/insta') 
                }
                else
                    alert("username already taken")
            })
        else {
            alert('Please Fill details')
        }

    }


    render() {
        return (
            <main>
                <div className="signup">
                    <div className='left-container'>
                        <img src="/back.png" alt='mobile_back' />
                        <div className="phone_pic">
                            <img src='/fst.jpg' alt='movile' />
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className="signinbox">
                            <img src='/instagram_logo.svg.png' className="instagram" alt='insta' />
                            <h3>Sign up to see photos and videos from your friends</h3>
                            <div className="button">
                                <Icon type="facebook" />Login with Facebook
                            </div>
                            <hr />
                            <div className="form">
                                <input type="text" className="form-input1" placeholder="Mobile Number "
                                    name="Mobile" value={this.state.Mobile} onChange={this.onChange}></input>
                                <input type="text" className="form-input1" placeholder="Email"
                                    name="Email" value={this.state.Email} onChange={this.onChange}></input>
                                <input type="text" className="form-input1" placeholder="Full Name"
                                    name="Name" value={this.state.Name} onChange={this.onChange}></input>
                                <input type="text" className="form-input1" placeholder="Username"
                                    name="Username" value={this.state.Username} onChange={this.onChange}></input>
                                <input type="password" className="form-input1" placeholder="Password"
                                    name="Password" value={this.state.Password} onChange={this.onChange}></input>
                                <div className="button" onClick={this.OnSubmit}>Sign Up</div>
                                <p className="sign-up-policy">By signing up, you agree to our Terms, Data Policy and Cookies Policy. </p>
                            </div>
                            <div className="have-account" >Have an account?
                                <Link to="/login"><button id="login-button">Log in</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        )
    }
}
export default Signup;