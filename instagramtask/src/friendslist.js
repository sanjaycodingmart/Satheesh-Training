import React, { Component } from 'react'
import Axios from './axios';
import './profile.css';
import {Button} from 'antd'
export default class friendslist extends Component {
    state={
        usernames:[]
    }
    checklocalstorage = () => {
        if (!localStorage.length) {
            this.props.history.push('/login')
        }
    }
    ref=()=>{
        Axios.get('/userfriends',{
            headers: {
                Authorization: `${localStorage.getItem('userDetails')}`
            }
        })
        .then(data=>{
            console.log(data)
            this.setState({
                usernames:data.data,
                click:!this.state.click
            })
        })
    }
    componentDidMount=()=>{
        this.checklocalstorage();
        this.ref();      
    }
    deleteUserfriend=(id)=>{
        console.log('object',id)
        Axios.get(`/deleteuser?id=${id}`)
        .then(data=>{
            console.log(data)
        })
        .then(() => {
            this.ref()
        })
    }
    render() {
        return (
            <div>
                 
                <h2 style={{display:'flex',justifyContent:'center'}}>Friendlists:</h2>
                <div className="user-friends">
                    {this.state.usernames.map((value,index)=>(
                        
                        <div className="name-list" key={index}>
                            <div className='profile2'>
                                <img src={value.profile}  alt='img' />
                            </div>
                            
                            <div>
                                <h3>@{value.username}<span>&nbsp;&nbsp;is following in you...</span>
                                <Button className="unfollow" onClick={()=>this.deleteUserfriend(value.id)}>Unfollow</Button></h3>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
