import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './signup.css';
import {Icon} from 'antd'
class Signup extends Component {
 
    state={
        Name:'',
        Mobile:'',
        Username:'',
        Password:'',
        a:[]
    };
onChange=(event)=>{
this.setState({
    [event.target.name]:event.target.value
})
}

OnSubmit=()=>{
var flag=1;
var a=[];
var b=[this.state.Mobile,this.state.Name,this.state.Username,this.state.Password];

        fetch(`http://localhost:8080/signup?name=${this.state.Name}&mobile=${this.state.Mobile}&username=${this.state.Username}&password=${this.state.Password}`)
            .then(response => response.json())
                .then(( data )=> {
                    console.log(data)
                })


for(let i=0;i<b.length;i++){
    if(b[i]=="")
    { 
        alert("Please fill the details")
    return ''
    }
}
const data={
    Mobile:this.state.Mobile,
    Name:this.state.Name,
    Username:this.state.Username,
    Password:this.state.Password
};  

 this.state.a.forEach(element => {
   if(element[0]==b[0]){
       flag=0;
   } 

});
if(flag){
    this.props.history.push('/login');
}

else{
    alert("username already taken")
}

this.setState({
    Name:'',
    Mobile:'',
    Username:'',
    Password:''
});
}


    render() {
        return (
           <main>
                <div className="signup">
                    <div className='left-container'>
                        <img src="/back.png" alt='mobile_back'/>
                        <div className="phone_pic">
                            <img src='/fst.jpg'  alt='movile'/>
                        </div>
                    </div>
                    <div className='right-container'>
                        <div className="signinbox">
                            <img src='/instagram_logo.svg.png'className="instagram" alt='insta'/>
                            <h3>Sign up to see photos and videos from your friends</h3>
                            <div className="button">
                            <Icon type="facebook" />Login with Facebook
                            </div>
                            <hr/>
                            <div className="form">
                                <input type="text" id="form-input" placeholder="Mobile Number or Email"
                                name="Mobile" value={this.state.Mobile} onChange={this.onChange}></input>
                                <input type="text" id="form-input" placeholder="Full Name"
                                name="Name" value={this.state.Name} onChange={this.onChange}></input>
                                <input type="text" id="form-input" placeholder="Username" 
                                name="Username" value={this.state.Username} onChange={this.onChange}></input>
                                <input type="password" id="form-input" placeholder="Password"
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