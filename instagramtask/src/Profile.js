import React, { Component } from 'react'
import { Icon, Button, Modal, Spin } from 'antd';
import './instapage.css';
import './profile.css';
import imageCompression from 'browser-image-compression';
import Axios from 'axios';
const {confirm}=Modal;
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            visible: false,
            image: '',
            content: '',
            Post_type: '',
            user_post: [],
            username: '',
            likes: [],
            postLikes: [],
            report:[],
            comment: '',isClicked:true,
        }
    }
    
    checklocalstorage = () => {
        if (!localStorage.length) {
          this.props.history.push('/login')
        }
      }
      info(report) {
        Modal.info({
            title: 'This is a notification message',
            content: (
                    <div className='reports'>
                         {report.slice(Math.max(report.length - 5, 1)).map((value) => (
                                <div >
                                    <p>{value.User.username}&nbsp;&nbsp;reported by the post&nbsp;
                                    <span>{value.Post.User.username}</span>
                                    </p>
                                </div>
                            ))}
                    </div>
            ),
            onOk() { },
        });
    }
    handleOk = e => {
        this.setState({
            visible: false,
        });
        let formData = new FormData();
        formData.append('myImage', this.state.image);
        formData.append('Post_type', this.state.Post_type);
        formData.append('content', this.state.content);
        formData.append('id', this.state.id);
        fetch('http://localhost:5003/profile', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
            })
            .then(() => { window.location.reload(); })
    }; 
    onHandle = (event) => {
        this.setState({
            [event.target.name]: event.target.value
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
    handleFile = async (event) => {
        var file = event.target.files[0];
        var options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(file, options)

            this.setState({ image: compressedFile })
        }
        catch (e) { console.log(e) }
        // this.setState({image:file})

    };
    Logout = () => {
        this.props.history.push('/login');
        localStorage.removeItem('userDetails')
    };
    homePage = () => {
        this.props.history.push('/insta');
    }
    fetchLikes = (data) => {

        let id = parseInt(localStorage.getItem('userDetails'))
        data.forEach(post => {
            let { postLikes } = this.state
            postLikes.push(post.Likes.length)
            this.setState({
                postLikes
            })
            post.Likes.forEach(like => {
                if (like.UserId === id) {
                    let { likes } = this.state
                    likes.push(post.id)
                    this.setState({
                        likes
                    })
                }
            })
        });
    }
    fetchName = (id) => {
        Axios.get(`http://localhost:5003/name?id=${id}`)
            .then((data) => {
                this.setState({
                    username: data.data.username
                });
            });
    }
    componentDidMount() {
        var id = localStorage.getItem('userDetails')
        this.setState({
            loading: true,
            id: id
        })
        fetch(`http://localhost:5003/instaprofile?id=${id}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    user_post: data,
                    loading: false
                });
                this.fetchLikes(data)
            })
        this.fetchName(id);
        this.checklocalstorage();
        this.fetchReport();
    }
    fetchReport=()=>{
        Axios.get('http://localhost:5003/fetchreport')
            .then((data)=>{
                console.log(data)
                this.setState({
                    report:data
                })
            })
    }
    upLikes = (e, index) => {
        var userid = localStorage.getItem('userDetails');
        var id = e
        let { likes, postLikes } = this.state;
        postLikes[index] += 1
        likes.push(e)
        this.setState({
            likes,
            postLikes
        })
        Axios.post('http://localhost:5003/like', {
            id, userid
        })
            .then((data) => {
                console.log(data)
            });

    }
    downlike = (e, index) => {
        let { likes, postLikes } = this.state;
        postLikes[index] -= 1
        likes.splice(likes.indexOf(e), 1)
        this.setState({
            likes,
            postLikes
        })
    }
    viewComments=()=>{
        this.setState({
            isClicked:!this.state.isClicked
        })
    }
    addComment = (e) => {
        var userid = localStorage.getItem('userDetails')
        var id = e
        var comment = this.state.comment
        Axios.post('http://localhost:5003/comment', {
            id, comment, userid
        }).then((data) => {
            console.log(data)
        });
    }
    addReply=(e)=>{
        var userid=localStorage.getItem('userDetails')
        console.log(e)
        var reply=this.state.reply
        Axios.post('http://localhost:5003/reply',{
            e,userid,reply
        }).then((data)=>{
            console.log(data)
        })
    }
    showConfirm(postid) {
        confirm({
          title: 'Do you want to report this post?',
        onOk() {
            var userid = localStorage.getItem('userDetails')
            Axios.post('http://localhost:5003/report', {
                postid, userid
            }).then((data) => {
                console.log(data)
            })
          },
          onCancel() {},
        });
      }
    render() {
        return (
            <div>
                <div className="headNav">
                    <div className="nav">
                        <div className="left">
                            <Icon type="instagram" className="icons" onClick={this.homePage} />
                            <hr className="line" />
                            <img src='/instagram_logo.svg.png' className="insta_icon" alt='insta' />
                        </div>

                        <div className="middle">
                            <input type="text" className="search-tag" placeholder="Search" autoCapitalize="none" />
                        </div>
                        <div className="right-icons">
                        {this.state.username==='admin'? <Icon type="compass" onClick={()=>this.info(this.state.report.data)} className='icons'/>
                           :<Icon type='compass' className='icons'/>}
                            <Icon type="heart" twoToneColor="black" className="icons" />
                            <Icon type="user" className="icons" />
                        </div>
                    </div>

                </div>
                <hr className="down-line" />
                <div className="pro1">
                    <div className="photo">
                        <div className="profile1">
                            <button title="change profie photo">
                                <img src="/profile.png" alt='img'/>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div className="users1">
                            <h1>{this.state.username}</h1>
                            <Button color="white">Edit Profile</Button>
                            <Icon type="setting" className='icons' />
                            <Icon type="logout" className='icons' onClick={this.Logout} />
                        </div>
                        <div className="settings1">
                            <Button>102Posts</Button>
                            <Button>519 followers</Button>
                            <Button boreder="none">470 followings</Button>
                        </div>
                        <div>
                            <h2>{this.state.username}</h2>
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
                            <input  type="text" placeholder=" Caption:"  value={this.state.content}
                                onChange={this.onHandle}
                                name="content" className="search-tag" />
                            <input type="file" className="files" name='myImage'
                                multiple onChange={this.handleFile} />
                            <input placeholder='post type' className="search-tag" name="Post_type"
                                value={this.state.Post_type} onChange={this.onHandle} />
                        </div>
                    </form>
                </Modal>
                <div className="example">
                    <Spin size="large" spinning={this.state.loading}>
                        <div className="grid-container">
                            <div className="reverse">
                                {!this.state.user_post.length && !this.state.loading ?
                                    <h1>no post</h1> :
                                    this.state.user_post.map((value, index) => (
                                        <div className="main-content" key={value.id} >
                                            <div className="post-nav">
                                                <div className="user">
                                                    <h2>{this.state.username}</h2>
                                                    <Icon type="ellipsis" className="icons" />
                                                </div>
                                                <div className="img-post">
                                                    <img src={value.Reports.length===5?'./blocked.png':value.img_url} className="main-img"alt='img' />
                                                </div>
                                                <div style={{ display: "flex" }}>
                                                    {this.state.likes.includes(value.id) ?
                                                        <img onClick={e => this.downlike(value.id, index)} src="/liked.svg" alt='img' /> :
                                                        <img onClick={e => this.upLikes(value.id, index)} src="/unliked.svg" alt='img'/>}
                                                    <h3> {this.state.postLikes[index]}</h3>
                                                    <div>
                                                    {value.Reports.length===5?null:
                                                        <img onClick={()=>this.showConfirm(value.id)} src='/report.svg' alt='img' />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <h2>{value.User.username}</h2>
                                                    <p>{value.content}</p>
                                                </div>
                                            <div>
                                                {this.state.isClicked?
                                                    value.Comments.slice(0,2).map(com =>
                                                    <div>
                                                        <div className="content1" key={com.id}>
                                                            <h3>{com.User.username}</h3>
                                                            <p>{com.comment}</p>
                                                        
                                                            <div className='comment1'>
                                                                <input type='text' className='comment-box1'placeholder="add reply"
                                                                name='reply' onChange={this.onHandle}/>
                                                                <p className='reply' style={{cursor:'pointer'}}
                                                                onClick={()=>this.addReply(com.id)}>Reply</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                                {com.Replycomments.map((value) =>
                                                                    <div className='replycomments' key={value.id}>
                                                                        <div className='replycomment1'>
                                                                            <h4>{value.reply}</h4>
                                                                            <p>replied by...</p>
                                                                            </div>
                                                                        <p>@{value.User.username}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                    </div>
                                                ):
                                                value.Comments.map((com,index) =>
                                                <div>
                                                    <h4 style={{display:'flex'}} onClick={this.viewComments}>View All Comments</h4>
                                                    <div className="content1" value={com.id}>
                                                            <h3>{com.User.username}</h3>
                                                            <p>{com.comment}</p>
                                                        
                                                            <div className='comment1'>
                                                                <input type='text' className='comment-box1'placeholder="add comment..."
                                                                name='reply' onChange={this.onHandle}/>
                                                                <p className='reply' style={{cursor:'pointer'}}
                                                                onClick={()=>this.addReply(com.id)}>Reply</p>
                                                            </div>
                                                        </div>
                                                         <div>
                                                             {com.Replycomments.map((value) =>
                                                                    <div className='replycomments'>
                                                                        <div className='replycomment1'>
                                                                            <h4>{value.reply}</h4>
                                                                            <p>replied by...</p>
                                                                        </div>
                                                                        <p>@{value.User.username}</p>
                                                                    </div>
                                                                )}         
                                                        </div> 
                                                </div>
                                                )
                                            }   
                                            </div>
                                                <div className='comment'>
                                                    <input type='text' className='comment-box' name='comment' onChange={this.onHandle} placeholder='write a comment' />
                                                    <h3 style={{ color: 'blue' }} onClick={e => this.addComment(value.id)}>post</h3>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        </Spin></div>
               
            </div>
        )
    }
}
export default Profile;