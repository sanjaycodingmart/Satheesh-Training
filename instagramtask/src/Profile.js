import React, { Component } from 'react'
import { Icon, Button,Modal,Spin} from 'antd';
import './instapage.css';
import './profile.css';
import imageCompression from 'browser-image-compression';
// import imageCompresser from 'image-compressor';
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
            status:true
        }
    }


handleOk = e => {
        this.setState({
             visible: false,
             usrname:this.props.location.state.usrname,
         });
         let formData = new FormData();
         formData.append('myImage',this.state.image);
         formData.append('Post_type',this.state.Post_type); 
         formData.append('username',this.props.location.state.usrname);
         formData.append('status',this.state.status);
         formData.append('content',this.state.content);
        
         fetch('http://localhost:8080/insta',{
             method:'POST',
             body:formData
         })
            .then(response=>response.json())
            .then((data)=>{
                console.log(data)
            })
            .then(()=>{window.location.reload();})
     
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
handleFile=async (event)=>{
        var file=event.target.files[0];
       
        var options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true
          }
          try{
            const compressedFile = await imageCompression(file, options)
           
            this.setState({image:compressedFile})
          }
          catch(e) {console.log(e)}  
        // this.setState({image:file})
        
     };
Logout=()=>{
        this.props.history.push('/login');
};

componentDidMount(){
    // console.log(this.state.status)
    this.setState({
            loading:true
        })
        // console.log(this.props.location.state.usrname)
        fetch(`http://localhost:8080/instaprofile?username=${this.props.location.state.usrname}`)
            .then(response=>response.json())
                .then((data)=>{
                   console.log(data.rows)
                        this.setState({
                            user_post:data.rows,
                            loading:false
                        });
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
                            <h1>{this.props.location.state.usrname}</h1>
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
                    <h2>{this.props.location.state.usrname}</h2>
                    {/* <div className='settings1'>
                        <Icon type="arrow-right" className='icons'/>
                        <h4>Student...#Enginnering...🎓🎓🎓</h4>
                    </div> */}
                    {/* <div className='settings1'>
                        <Icon type="arrow-right" className='icons'/>
                        <h4>Music Lover...🎹🎸🎷🎶🎶</h4>
                    </div> */}
                    {/* <div className='settings1'>
                        <Icon type="arrow-right"className='icons' />
                        <h4>Dreamer 😇😇😇</h4>
                    </div> */}
                    {/* <div className='settings1'>
                        <Icon type="arrow-right"className='icons' />
                        <h4>cry on Dec 4</h4>
                    </div> */}
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
                                <input placeholder=" Caption:" name='content' value={this.state.content}
                                onChange={this.onHandle} 
                                name="content" type="text" className="search-tag"/>
                                <input type="file" className="files" name='myImage'
                                 multiple onChange={this.handleFile}/>
                                <input placeholder='post type' className="search-tag" name="Post_type"
                                    value={this.state.Post_type} onChange={this.onHandle}/>
                          </div>
                        </form>
                </Modal>
            <div className="example">
                 <Spin size="large" spinning={this.state.loading}>
                    <div className="grid-container">
                    <div className="reverse">
                        {!this.state.user_post.length && !this.state.loading ?
                        <h1>no post</h1>:
                        this.state.user_post.map((value)=>( 
                        <div class="main-content" key={value.img_url}> 
                                <div className="post-nav">
                                    <div class="user">
                                        <h2>{value.username}</h2>
                                        <Icon type="ellipsis"  className="icons" />
                                    </div>  
                                    <div className="img-post">
                                        <img src={value.img_url} className="main-img" />
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <Icon type="heart" className='icons' />
                                        <div style={{marginRight:"480px"}}>
                                        <Icon type="book" className="icons"/>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h2>{value.username}</h2>
                                        <p>{value.content}</p>
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