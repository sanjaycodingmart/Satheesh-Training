import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './signup.css';
import { Icon } from 'antd'
import Axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
class Signup extends Component {
 constructor(props){
     super(props)
     if(localStorage.getItem('userDetails')){
        props.history.push('/insta') 
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
    responseFacebook(response) {
        console.log(response);
        var body={
            name:response.name,
            username:response.name,
            email:response.email
        }
        Axios.post('http://localhost:5003/signup',{
            body
        }).then((data)=>{
            console.log(data)
            if (!data.data.errors) {
                localStorage.setItem('userDetails',data.data.id)
                this.props.history.push('/insta') 
            }
            else
                alert("username already taken")
        })
      }
    responseGoogle = (response) => {
        console.log(response);
        Axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.Zi.id_token}`)
            .then((data)=>{
                console.log(data)
                var body={
                    name:data.data.name,
                    email:data.data.email,
                    username:data.data.given_name
                }
                Axios.post('http://localhost:5003/signup', {
                body
                }).then((data) => {
                console.log(data)
                if (!data.data.errors) {
                    this.setState({ Name: '', Mobile: '', Username: '', Password: '', Email: '' });
                    localStorage.setItem('userDetails',data.data.id)
                    this.props.history.push('/insta') 
                }
                else
                    alert("username already taken")
            })
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
                    this.props.history.push('/insta') 
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
                            <div style={{marginLeft:'65px'}}>
                                    <GoogleLogin
                                        clientId="393679722637-m0hhipqi6tepegljck59o2vomim5jacr.apps.googleusercontent.com"
                                        render={renderProps => (
                                        <button  style={{background:'none',border:'none'}}
                                                onClick={renderProps.onClick} 
                                                disabled={renderProps.disabled}> 
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" style={{height:'20px'}}/>
                                                <span style={{color: 'blue',marginLeft:'10px'}}>Login with Google</span>
                                        </button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={this.responseGoogle} 
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
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
                            <div style={{marginLeft:'22px'}}>
                                <FacebookLogin
                                    appId="610082599778961"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    callback={this.responseFacebook}
                                    icon={<Icon type="facebook" />}
                                />
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