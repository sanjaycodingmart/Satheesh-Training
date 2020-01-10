import React, { Component } from 'react'
import { Modal, Button,Icon,Spin } from 'antd';
import './instapage.css';
import * as firebase from 'firebase';

window.$array=[];
class Instapage extends Component {
    state = { 
        visible: false,
        Post_type:'',
        user_post:[],
        usrname:'',
        loading:false,
        post:[]
     };

    redirect=()=>{
            this.props.history.push({
                pathname:'/login/insta/profile',
                state:{
                    usrname:this.props.location.state.Username
                }
            });
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        const ref=firebase.database().ref("Insta_post");
          ref.on("value",(data)=>{
            this.setState({
                user_post:data.val(),
                loading:false,
                usrname:this.props.location.state.Username
            })
            var post1=[];
            for(let i=0; i<data.val().length;i++){
                if(data.val()[i].Post_type=='PublicPost'){
                    post1=this.state.post;
                    post1.push(data.val()[i])

                    }
                    this.setState({
                        post:post1
                    })
                }
          })
        console.log(this.state.usrname)
        
      }
    render() {
        // console.log(this.props.location.state.Username)
        return (
            <div>
                <div className="headNav">
                        <div className="nav">
                            <div className="left ">
                                    <Icon type="instagram" className="icons" />
                                    <hr className="line"/>
                                    <img src='/instagram_logo.svg.png'className="insta_icon" alt='insta'/>     
                            </div>
                                
                            <div className="middle">
                                <input type="text" className="search-tag" type="text" placeholder="Search" autoCapitalize="none"/>
                            </div>
                            <div class="right-icons">
                                    <Icon type="compass" className="icons" />
                                    <Icon type="heart" twoToneColor="black" className="icons" />
                                    <Icon type="user"  className="icons" onClick={this.redirect} />
                            </div>
                        </div>

                </div>
                    <hr className="down-line"/>                    
            <div className="example">
                 <Spin size="large" spinning={this.state.loading}><div className="grid-container">
                    <div className="reverse">
                            {this.state.post.map((value)=>( 
                        <div class="main-content" key={value.Content}> 
                                <div className="post-nav">
                                    <div class="user">
                                        <h2>{value.Username}</h2>
                                        <Icon type="ellipsis"  className="icons" />
                                    </div>  
                                    <div className="img-post">
                                        <img src={value.Image_url} className="main-img" />
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <Icon type="heart" className='icons' />
                                        {/* <img src="/comment.jpeg" className="comment-img" /> */}
                                        <div style={{marginRight:"480px"}}>
                                        <Icon type="book" className="icons"/>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h2>{value.Username}</h2>
                                        <p>{value.Content}</p>
                                    </div>
                                </div>
                        </div>    
                        ))}
                    </div>
                </div></Spin></div>
            
        </div>
           
        )
    }
}
export default Instapage;