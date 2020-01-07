import React, { Component } from 'react';
import './css/style.css';
import Content from './fetchcontent';

class Root extends Component {
    checkLocalStorage = () => {
        if(localStorage.length === 0) {
            this.props.history.push('/');   
        }
    }
    componentDidMount(){         
        this.checkLocalStorage(); 
        window.addEventListener('storage',()=>{
            this.checkLocalStorage();
        });
    }
    
    setName=(v) => {
        this.props.setName(v)
    }

    render() { 
            return ( 
                <div>
                    <h1  className="homepage">Welcome to the HomePage!!!</h1>
                    {/* <Content name={this.props.name} setName={this.setName} /> */}
                    {/* <Content name={this.props.name} /> */}
                    <Content />
                </div>)
}
}

export default Root;