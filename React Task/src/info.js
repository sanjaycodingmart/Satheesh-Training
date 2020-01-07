import React from "react";
import './css/style.css';
import Button from '@material-ui/core/Button';


const initialstate={
        show: false,
        email:'',
        Name:'',
        phno:'',
        Nameerror:'',       
        Emailerror:'',
        NoError:'',
        isSubmitted:false
    };

class Main extends React.Component{
    state=initialstate;
    showModal = () => {
        this.setState({ show: !this.state.show });
        console.log("submit")
      };

    handleChange= event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
        console.log(this.state)
        
      };
      validate=()=>{
        let Nameerror='';
        let  Emailerror='';
        let NoError='';
            if (this.state.Name.length<=5)
            {
                Nameerror="you are name is too small";
            }
            if(this.state.phno.length!==10){
                NoError="Mobile Number should be 10 Digits";
            }
            if (!this.state.email.includes("@")) {
                Emailerror="plese enter the valid email id";
            }
            if (Emailerror||Nameerror||NoError){
                this.setState({Emailerror,Nameerror,NoError});
            }
            if(this.state.Name===''||this.state.email===''||this.state.phno===''){
                return false;
             }
            return true;
         
      };
      handleSubmit=event=>{
          
          event.preventDefault();
          const isValid=this.validate();
          console.log(isValid);
        
          if(isValid){        
                localStorage.setItem("UserDetails", JSON.stringify(this.state));
                this.props.history.push('/home');   
            }
            console.log(this.state) 
      }; 

    render(){
        let showw = (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text"  id=''
                        value={this.state.name}
                        onChange={this.handleChange} name="Name" />
                    </div>
                    <h2 style={{color:"red",fontSize:"14px"}}>{this.state.Nameerror}</h2>
                    <div>
                        <label>contactNo:</label>
                        <input type="text"  id=''
                         onChange={this.handleChange}
                         value={this.state.phno}
                          name="phno"/>
                    </div>
                     <h2 style={{color:"red",fontSize:"14px"}}>{this.state.NoError}</h2> 
                    <div>
                        <label>E-mail:</label>
                        <input type="text" 
                        value={this.state.email}
                        onChange={this.handleChange} name="email"
                        id='' />
                    </div>
                    <h2 style={{color:"red",fontSize:"14px"}}>{this.state.Emailerror}</h2>
                    <div>
                        <label>PreferredLanguages:</label>
                        <select>
                            <option>English</option>
                            <option>Tamil</option>
                            <option>Kannada</option>
                            <option>Malayalam</option>
                            <option>Telugu</option>
                        </select>
                    </div>
                    <button  variant="contained" color="inherit">Submit</button> 
                </form>
            </div>
        );
      
            return (
                <main>
                    <div className="home">
                        <h1>Hello ,Welcome!!!</h1>
                        <Button variant="contained" color="inherit" onClick={this.showModal}>Signup</Button> 
                    </div>
                      
                    {this.state.show ? showw : null}
                </main>);

        }
  
       
}
export default Main;