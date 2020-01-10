import React, { Component } from 'react'
import { Icon, Button,Modal,Spin} from 'antd';
import './instapage.css';
import './profile.css';
import * as firebase from 'firebase'
class Profile extends Component {
    constructor(){
        super()
        this.state={
            loading:false,
            visible:false,
            fileimage:'',
            image:'',
            content:'',
            Post_type:'',
            user_post:[],
            usrname:'',
            img:'',
            con:''
        }
    }


    handleOk = e => {
        console.log("ok")
        this.setState({
             visible: false,
             usrname:this.props.location.state.usrname,
             img:this.state.image,
             con:this.state.content
         },()=>{
             const data={
                 Image_url:this.state.img,
                 Content:this.state.con,
                 Username:this.props.location.state.usrname,
                 Post_type:this.state.Post_type
             };
             var Ab=[];
             var Ab=this.state.user_post
             Ab.push(data)
             this.setState({
                 user_post:Ab
             })
            const ref=firebase.database().ref("Insta_post");
             ref.update(this.state.user_post);
         })
      
 };

 onHandle=(event)=>{
    this.setState({
        [event.target.name]:event.target.value
    })
};

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
     
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      handleFile=(event)=>{
        var file=event.target.files[0];
        var reader=new FileReader();
         reader.onload=()=>{
             this.setState({
                 image:reader.result
             })
         }
         this.setState({
             fileimage:event.target.value
         })
         reader.readAsDataURL(file);
     }
Logout=()=>{
    this.props.history.push('/login');
}

componentDidMount(){
    this.setState({
            loading:true
        })
        const ref=firebase.database().ref("Insta_post");
          ref.on("value",(data)=>{
              console.log(data.val())
              var post2 =[];
            for(let i=0;i< data.val().length;i++){
                  if(data.val()[i].Username==this.props.location.state.usrname){
                      post2=this.state.user_post
                      post2.push(data.val()[i])
                  }
              }  
            this.setState({
                user_post:post2,
                loading:false
            })
          })
}

    render() {
    return (
        <div>
                <div className="headNav">
                        <div className="nav">
                            <div className="left">
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
                                    <Icon type="user"  className="icons" />
                            </div>
                        </div>

                </div>
                    <hr className="down-line"/>
            <div className="pro1">
                <div className="photo">
                    <div className="profile1">
                        <button title="change profie photo"> 
                            <img src="/profile.png"/>
                        </button>
                    </div>
            </div>
                <div>
                        <div className="users1">
                            <h1>User_name@98</h1>
                            <Button color="white">Edit Profile</Button>
                            <Icon type="setting" className='icons' />
                            <Icon type="logout" className='icons' onClick={this.Logout}/>
                        </div>
                        <div className="settings1">
                            <Button>102Posts</Button>
                            <Button>519 followers</Button>
                            <Button boreder="none">470 followings</Button>
                        </div>
                <div>
                    <h3>🇸🅰🇹🅷🇪🅴🇸🅷__🅺🇺🅼🇦🆁 </h3>
                    <div className='settings1'><Icon type="arrow-right" />
                    <h4>Student...#Enginnering...🎓🎓🎓</h4></div>
                    <div className='settings1'>
                    <Icon type="arrow-right" /><h4>Music Lover...🎹🎸🎷🎶🎶</h4>
                    </div>
                    <div className='settings1'>
                    <Icon type="arrow-right" /><h4>Dreamer 😇😇😇</h4>
                    </div>
                    <div className='settings1'>
                    <Icon type="arrow-right" /><h4>cry on Dec 4</h4>
                    </div>

                </div>
                </div>
               
            </div>

            <Button type="primary" onClick={this.showModal}>AddPost</Button>
                    <Modal title="Post Modal"  
                                visible={this.state.visible}
                                onOk={this.handleOk} 
                                onCancel={this.handleCancel}>
                        <form>
                          <div className="modal">
                                <input placeholder=" Caption:" value={this.state.content}
                                onChange={this.onHandle} 
                                name="content" type="text" className="search-tag"/>
                                <input type="file" className="files"
                                 multiple onChange={this.handleFile}/>
                                <select className="search-tag" name="Post_type"
                                    value={this.state.Post_type} onChange={this.onHandle}>
                                    <option></option>
                                    <option>PublicPost</option>
                                    <option>PrivatePost</option>
                                </select>
                          </div>
                        </form>
                </Modal>

                <div className="example">
                 <Spin size="large" spinning={this.state.loading}>
                    <div className="grid-container">
                    <div className="reverse">
                        {!this.state.user_post.length && !this.state.loading ? <h1>no post</h1>:
                        this.state.user_post.map((value)=>( 
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
export default Profile;