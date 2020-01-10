import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './signup.css';
import {Icon} from 'antd'
import * as firebase from 'firebase';
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
const ref=firebase.database().ref("userdetails");

for(let i=0;i<b.length;i++){
    if(b[i]=="")
    { alert("Please fill the details")
    return ''
    }
}
const data={
    Mobile:this.state.Mobile,
    Name:this.state.Name,
    Username:this.state.Username,
    Password:this.state.Password
};  
console.log(data)
 this.state.a.forEach(element => {
   if(element[0]==b[0]){
       flag=0;
   } 

});
if(flag){
    var a2=this.state.a;
    a2.push(data);
    this.setState({
        a:a2
    })
    ref.set(this.state.a);
    alert("Signup Sucessfully ");
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
componentDidMount(){
    const ref=firebase.database().ref("userdetails");
    
    ref.on("value",(data)=>{
        console.log(data.val())
        var a1=data.val()

        this.setState({
            a:a1,
        })
    })
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