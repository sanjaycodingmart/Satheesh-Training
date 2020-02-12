import React, { Component } from 'react'
import { Icon, Button, Modal, Spin, Switch } from 'antd';
// import './instapage.css';
import './profile.css';
import Axios from './axios';
import jwt from 'jsonwebtoken';

const { confirm } = Modal;
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
            report: [],
            comment: '', isClicked: true,
            hide: false,
            toggle: false,
            offset: 0,
            profile: '',
            picture: '',
            pic:false,
            count:''
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
        console.log(formData)
        Axios({
            method: 'POST',
            url: `http://localhost:5003/profile`,
            data: formData,
            config: {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                },
            },
        }).then((response) => {
            console.log(response)
        }).then(()=>{
            this.ref()
        });    
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
        // var options = {
        //     maxSizeMB: 2,
        //     maxWidthOrHeight: 1920,
        //     useWebWorker: true
        // }
        // try {
        //     const compressedFile = await imageCompression(file, options)

        //     this.setState({ image: compressedFile })
        // }
        // catch (e) { console.log(e) }
        this.setState({
            image: file
        })
    };
    handleProfile = (e) => {
        var file = e.target.files[0];
        var size=((file.size/1024)/1024).toFixed(1);
        console.log('size',size)
        if(size>1){
            alert('image size is too long please select the image in Size 1MB ')
        }else{
            this.setState({
                profile: file
            }, () => { this.upload(); })
        }  
    }
    upload = () => {
        let formData = new FormData();
        formData.append('profile', this.state.profile);
        console.log(formData)
        Axios({
            method: 'POST',
            url: `http://localhost:5003/upload`,
            data: formData,
            config: {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                },
            }
        }).then(response => {
            console.log(response)
        }).then(()=>{this.fetchName()})
    }
    Logout = () => {
        localStorage.removeItem('userDetails')
        this.props.history.push('/login');
    };
    homePage = () => {
        this.props.history.push('/insta');
    }
    fetchLikes = (data) => {
        let token = localStorage.getItem('userDetails') ?? null
        if (!token) return
        let id = jwt.decode(token).userid
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
    fetchName = () => {
        Axios.get('http://localhost:5003/name',
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            })
            .then((data) => {
                this.setState({
                    username: data.data.username,
                    toggle: data.data.otpEnable,
                    picture: data.data.profile
                });
            });
    }
    addEventListener = () => {
        var scroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY === scroll) {
            let offset = this.state.offset + 1
            if(offset*2<this.state.count){
                this.setState({
                    offset
                })
                Axios.get(`http://localhost:5003/instaprofile?offset=${this.state.offset}`,
                {
                    headers: {
                        Authorization: `${localStorage.getItem('userDetails')}`
                    }
                })
                .then(({ data }) => {
                    console.log(data)
                    data.forEach(element => {
                        this.setState({
                            user_post: [...this.state.user_post, element]
                        })
                    });
                    this.setState({
                        loading: false
                    });
                })
            }
           
           
        }
    }
    ref = () => {
        Axios.get(`http://localhost:5003/instaprofile?offset=${this.state.offset}`,
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            })
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    user_post: data,
                    loading: false
                });

                this.fetchLikes(data)
            })
    }
    componentDidMount() {
        this.setState({
            loading: true,
        })
        window.addEventListener('scroll', this.addEventListener, false)
        this.ref();
        this.count();
        this.fetchName();
        this.checklocalstorage();
        this.fetchReport();
        console.log(this.state.user_post)
    }
    count=()=>{
        Axios.get('http://localhost:5003/getcount1',{
            headers:{
                Authorization:`${localStorage.getItem('userDetails')}`
            }
        }).then(({data})=>{
            console.log(data)
            this.setState({count:data.count})
        })
    }
    fetchReport = () => {
        Axios.get('http://localhost:5003/fetchreport',
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            })
            .then((data) => {
                this.setState({
                    report: data
                })
            })
    }
    upLikes = (e, index) => {
        var id = e
        let { likes, postLikes } = this.state;
        postLikes[index] += 1
        likes.push(e)
        this.setState({
            likes,
            postLikes
        })
        Axios.post('http://localhost:5003/like', {
            id
        },
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
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
    viewComments = () => {
        this.setState({
            isClicked: !this.state.isClicked
        })
    }
    addComment = (e) => {
        var id = e
        var comment = this.state.comment
        Axios.post('http://localhost:5003/comment', {
            id, comment
        },
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            }).then((data) => {
                console.log(data)
            }).then(this.ref())
    }
    addReply = (e) => {
        console.log(e)
        var reply = this.state.reply
        Axios.post('http://localhost:5003/reply', {
            e, reply
        }, {
            headers: {
                Authorization: `${localStorage.getItem('userDetails')}`
            }
        }).then((data) => {
            console.log(data)
        }).then(this.ref())

    }
    showConfirm(postid) {
        confirm({
            title: 'Do you want to report this post?',
            onOk() {
                Axios.post('http://localhost:5003/report', {
                    postid
                },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem('userDetails')}`
                        }
                    }).then((data) => {
                        console.log(data)
                    })
            },
            onCancel() { },
        });
    }
    onChange = () => {
        let state = !this.state.toggle
        console.log(state)
        this.setState({
            toggle: state
        })
        console.log(this.state.toggle)
        Axios.post('http://localhost:5003/otpset', {
            state
        },
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            }
        ).then(data => {
            console.log(data)
        })
    }
    showToggle = () => {
        var x = document.getElementsByClassName("hide")[0]
        if (!this.state.hide) {
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
        this.setState({
            hide: !this.state.hide
        })
    }
    delete = (id) => {
        let res = this.ref
        console.log(id)
        confirm({
            title: 'Do you Want really delete this post?',
            onOk() {
                Axios.post('/deletepost', {
                    id
                },
                    { headers: {
                            Authorization: `${localStorage.getItem('userDetails')}`
                        }
                    }).then((data) => {
                        console.log(data)
                    }).then(()=>{
                        // window.location.reload();
                        res()
                    })
                
            }, onCancel() { }
        });
    }
    remove = (id) => {
        console.log('remove', id)
        Axios.get(`/remove?id=${id}`)
            .then(data => {
                console.log(data)
            }).then(this.ref())
    }
    imageDelete=()=>{
        console.log('object')
        Axios.get('/deleteimage',{
            headers: {
                Authorization: `${localStorage.getItem('userDetails')}`
            }
        }).then(data=>{
            console.log(data)
        }).then(()=>{this.fetchName()})
    }
    showfeatures=()=>{
        this.setState({
            pic:!this.state.pic
        })
    }
    render() {
        return (
            <div>
                <div className="headNav">
                    <div className="nav">
                        <div className="left">
                            <Icon type="instagram" className="icons" data-tooltip="#edit" title="Go to Homepage" onClick={this.homePage} />
                            <hr className="line" />
                            <img src='/instagram_logo.svg.png' className="insta_icon" alt='insta' />
                        </div>

                        <div className="middle">
                            <input type="text" className="search-tag" placeholder="Search" autoCapitalize="none" />
                        </div>
                        <div className="right-icons">
                            {this.state.username === 'admin' ? <Icon type="compass" onClick={() => this.info(this.state.report.data)} className='icons' />
                                : <Icon type='compass' className='icons' />}
                            <Icon type="heart" twoToneColor="black" className="icons" />
                            <Icon type="user" className="icons" />
                        </div>
                    </div>

                </div>
                <hr className="down-line" />
                <div className="pro1">
                    <div className="photo">
                        <div className="profile1">
                               {this.state.picture ?<div>
                                    <img src={this.state.picture} title="change profile Picture" alt='img'onClick={this.showfeatures} /> 
                                        {this.state.pic &&
                                            <div>
                                                <label for="files" className="uploads">
                                                    <div>
                                                        Change Profile Picture
                                                    </div>
                                                </label>
                                                <div className='delete-image' onClick={this.imageDelete}>
                                                    Delete Profile Picture
                                                </div>
                                            </div>}
                                        </div>:
                                    <div>
                                        <img src='./picture.jpeg' id="upload" alt='img'title='upload profile picture' onClick={this.showfeatures} />
                                        {this.state.pic&&
                                            <div>
                                                <label for="files" className="uploads">
                                                    <div>
                                                        Upload Profile Picture
                                                    </div>
                                                    
                                                </label>
                                                <div className="delete-image" onClick={this.imageDelete}>Delete Profile Picture</div>
                                        </div>}
                                 </div>}
                            <input type="file" name='profile' onChange={this.handleProfile} id="files"></input>
                        </div>
                    </div>
                    <div>
                        <div className="users1">
                            <h1>{this.state.username}</h1>
                            <Button color="white" id='edit'>Edit Profile</Button>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Icon type="setting" title="Goto settings" className='icons' onClick={this.showToggle} />
                                <div className="hide">
                                    Don't Allow OTP Authentication
                                        <Switch checked={this.state.toggle} onChange={this.onChange} />
                                </div>
                            </div>
                            <Icon type="logout" className='icons' data-tooltip="#edit" title="Logout to MyAccount" onClick={this.Logout} />

                        </div>
                        <div className="settings1">
                            <Button color="white" id='edit'>102Posts</Button>
                            <Button color="white" id='edit'>519 followers</Button>
                            <Button color="white" id='edit' >470 followings</Button>
                        </div>
                        <div style={{ marginLeft: '13px' }}>
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
                <div className='addbutton'>
                    <Button className='addpost' title="Upload the post" id="button" onClick={this.showModal}><Icon type="plus-circle" className='icons1' />Add Post</Button>
                </div>

                <Modal title="Post Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <form>
                        <div className="modal">
                            <input type="text" placeholder=" Caption:" value={this.state.content}
                                onChange={this.onHandle}
                                name="content" className="search-tag" />
                            <input type="file" className="files" name='myImage'
                                multiple onChange={this.handleFile} accept=".jpg,.jpeg.,.gif,.png,.mov,.mp4" />
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
                                    <h1>No post</h1> :
                                    this.state.user_post.map((value, index) => (
                                        <div className="main-content" key={index} >
                                            <div className="post-nav">
                                                <div className="user">
                                                    <h2>{this.state.username}</h2>
                                                    <Icon type="ellipsis" className="icons" />
                                                </div>
                                                <div className="img-post">
                                                    {value.Reports.length === 5 ?
                                                        <div className="main-img" style={{
                                                            display: 'flex', justifyContent: 'center',
                                                            alignItems: 'center', color: 'white', backgroundColor: 'gray', width: '100%', height: '50vh'
                                                        }}>This Image has been blocked by User
                                                        </div> :
                                                        <div className="main-img" >
                                                            {value.img_url.includes('.mp4') ?
                                                                <video controls style={{ width: '100%' }}>
                                                                    <source src={value.img_url} type="video/mp4" />
                                                                </video> :
                                                                <img src={value.img_url} alt='img' style={{ width: '100%' }} />}
                                                        </div>}

                                                </div>
                                                <div className='post'>
                                                    <div>
                                                        {this.state.likes.includes(value.id) ?
                                                            <img onClick={e => this.downlike(value.id, index)} src="/liked.svg" alt='img' /> :
                                                            <img onClick={e => this.upLikes(value.id, index)} src="/unliked.svg" alt='img' />}
                                                        <span className='bolds'> {this.state.postLikes[index]}Likes</span>
                                                    </div>
                                                    <div className="delete-icon">
                                                        <Icon type="delete" title="Delete the post" className='icons1' onClick={() => { this.delete(value.id) }} />
                                                        {value.Reports.length === 5 ? null :
                                                            <img onClick={() => this.showConfirm(value.id)}
                                                                title="Report the post" src='/report.svg' alt='img' />
                                                        }

                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <h2>{value.User.username}</h2>
                                                    <p>{value.content}</p>
                                                </div>
                                                <div>
                                                    {this.state.isClicked ?
                                                        value.Comments.slice(0, 2).map(com =>
                                                            <div>
                                                                <div className="content1" key={com.id}>
                                                                    <h3>{com.User.username}</h3>
                                                                    <p>{com.comment}</p>
                                                                    <Icon type="delete" className='icons1' onClick={() => this.remove(com.id)} />
                                                                    <div className='comment1'>
                                                                        <input type='text' className='comment-box1' placeholder="add reply"
                                                                            name='reply' onChange={this.onHandle} />
                                                                        <p className='reply' style={{ cursor: 'pointer' }}
                                                                            onClick={() => this.addReply(com.id)}>Reply</p>
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
                                                        ) :
                                                        value.Comments.map((com, index) =>
                                                            <div>
                                                                <h4 style={{ display: 'flex' }} onClick={this.viewComments}>View All Comments</h4>
                                                                <div className="content1" value={com.id}>
                                                                    <h3>{com.User.username}</h3>
                                                                    <p>{com.comment}</p>
                                                                    <Icon type="delete" onClick={() => this.remove(com.id)} />
                                                                    <div className='comment1'>
                                                                        <input type='text' className='comment-box1' placeholder="add comment..."
                                                                            name='reply' onChange={this.onHandle} />
                                                                        <p className='reply' style={{ cursor: 'pointer' }}
                                                                            onClick={() => this.addReply(com.id)}>Reply</p>
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