import React, { Component } from 'react'
import { Icon, Spin, Modal } from 'antd';
import './instapage.css';
import Axios from './axios';
import jwt from 'jsonwebtoken'
const { confirm } = Modal;
class Instapage extends Component {
    state = {
        visible: false,
        Post_type: '',
        loading: false,
        post: [],
        username: '',
        likes: [],
        postLikes: [],
        comment: '',
        reply: '',
        report: [],
        isClicked: true,
        otp: false,
        otpmsg: '',
        offset: 0,count:''
    };
    checklocalstorage = () => {
        if (!localStorage.length) {
            this.props.history.push('/login')
        }
    }
    onHandle = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    info(report) {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div className='reports'>
                    {report.slice(Math.max(report.length - 5, 1)).map((value) => (
                        <div>
                            <p>{value.User.username}&nbsp;&nbsp;reported by the post&nbsp;
                                    <span>{value.Post.User.username}</span>
                            </p>
                        </div>
                    ))}
                </div>
            ),
            onOk() {
            },
        });
    }
    success = () => {
        let self = this
        Modal.info({
            title: 'Enter your Otp?',
            content: (
                <input type='text' onChange={this.onHandle} name="otpmsg" style={{ border: '1px solid #555', borderRadius: '2px' }} />
            ),
            onOk() {
                var otp = self.state.otpmsg
                Axios.post('/otp', {
                    otp
                },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem('userDetails')}`
                        }
                    }).then((data) => {
                        console.log(data)
                        if (!data.data.valid) {
                            confirm({
                                title: 'Incorrect Otp!please enter the valid otp',
                                onOk() {
                                    self.success()
                                },
                                onCancel() { }
                            })
                        }
                        else {
                            self.setState({
                                otp: true
                            })
                        }
                    })
            }
        });
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

    redirect = () => {
        this.props.history.push('/profile');
    }
    getName = () => {
        Axios.get('/name',
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            })
            .then((data) => {
                console.log(data)
                this.setState({
                    username: data.data.username
                });
            });
    }
    componentDidMount() {
        window.addEventListener('scroll', this.addEventListener, false)
        Axios.get('/otpcheck',
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            })
            .then(data => {
                if (data.data.id) {
                    this.setState({
                        otp: false
                    })
                    this.success()
                } else {
                    this.setState({ otp: true })
                }
            })
        this.setState({
            loading: true
        })
        this.ref();
        this.count();
        this.checklocalstorage();
        this.fetchReport();
        this.getName();
    }
    count=()=>{
        Axios.get('http://localhost:5003/getcount').then(({data})=>{
            console.log(data)
            this.setState({count:data.count})
        })
    }
    addEventListener = () => {
        var scroll = document.documentElement.scrollHeight - window.innerHeight;
        if (scroll === window.scrollY) {
            let offset = this.state.offset + 1
            if(offset*2<this.state.count){
                this.setState({ offset })
                Axios.get(`/instapage?offset=${offset}`,
                    {
                        headers: {
                            Authorization: `${localStorage.getItem('userDetails')}`,
                        }
                    })
                    .then(({ data }) => {
                        console.log(data)
                        data.forEach(element => {
                            this.setState({
                                post: [...this.state.post, element],
                            });
                        });
                        this.setState({
                            loading: false
                        })
                        this.fetchLikes(data);
                    });
            }
        }

    }
    fetchReport = () => {
        Axios.get('/fetchreport',
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
    ref() {
        Axios.get(`/instapage?offset=${this.state.offset}`,
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            })
            .then(({ data }) => {
                console.log(data)
                this.setState({
                    post: data,
                    loading: false,
                });
                this.fetchLikes(data);
            });
    }

    upLikes = (id, index) => {
        let { likes, postLikes } = this.state;
        postLikes[index] += 1
        likes.push(id)
        this.setState({
            likes,
            postLikes
        })
        Axios.post('/like', {
            id
        },
            {
               headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            }).then((data) => {
                console.log(data)
            });
    }
    downlike = (e, index) => {
        var postid = e;
        let { likes, postLikes } = this.state;
        postLikes[index] -= 1
        likes.splice(likes.indexOf(e), 1)
        this.setState({
            likes,
            postLikes
        })
        Axios.post('/dislike', {
            postid
        },
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            }).then((data) => {
                console.log(data)
            })
    }
    addComment = (e) => {
        var id = e
        console.log(id)
        var comment = this.state.comment
        Axios.post('/comment', {
            id, comment
        },{
            headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            }).then((data) => {
                console.log('response for comment', data)
                })
            .then(() => {
                    this.ref()
            })
    }
    viewComments = () => {
        this.setState({
            isClicked: !this.state.isClicked
        })
    }
    addReply = (e) => {
        var reply = this.state.reply
        Axios.post('/reply', {
            e, reply
        },
            {
                headers: {
                    Authorization: `${localStorage.getItem('userDetails')}`
                }
            }).then((data) => {
                console.log(data)
            }).then(() => {
                this.ref()
            })

    }
    delete = (e) => {
        console.log(e)
        let id = e
        confirm({
            title: 'Do you Want really delete this post?',
            onOk() {
                Axios.post('/deletepost', {
                    id: id
                },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem('userDetails')}`
                        }
                    }).then((data) => {
                        console.log(data)
                    }).then(() => {
                        this.ref()
                    })
            },
            onCancel() { },
        });
        this.ref();
    }
    showConfirm(postid) {
        confirm({
            title: 'Do you want to report this post?',
            onOk() {
                Axios.post('/report', {
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
    remove=(id)=>{
        console.log('remove',id)
        Axios.get(`/remove?id=${id}`)
            .then(data=>{
                console.log(data)
            }).then(() => {
                this.ref()
            })
    }
    render() {
        return (
            <div>
                {this.state.otp === true &&
                    <div>
                        <div className="headNav">
                            <div className="nav">
                                <div className="left ">
                                    <Icon type="instagram" className="icons" />
                                    <hr className="line" />
                                    <img src='/instagram_logo.svg.png' className="insta_icon" alt='insta' />
                                </div>

                                <div className="middle">
                                    <input type="text" className="search-tag" placeholder="Search" autoCapitalize="none" />
                                </div>
                                <div className="right-icons">
                                    {this.state.username === 'admin' ?
                                        <Icon type="compass" onClick={() => this.info(this.state.report.data)} className='icons' />
                                        : <Icon type='compass' className='icons' />}
                                    <Icon type="heart" twoToneColor="black" className="icons" />
                                    <Icon type="user" className="icons" title='Go to UserProfile' onClick={this.redirect} />
                                </div>
                            </div>

                        </div>
                        <hr className="down-line" />
                        <div className="example">
                            <Spin size="large" spinning={this.state.loading}>
                                <div className="grid-container">
                                    <div className="reverse">
                                        {this.state.post.map((value, index) => (
                                            <div className="main-content" key={value.id}>
                                                <div className="post-nav">
                                                    <div className="user">
                                                        <h3>{value.User.username}</h3>
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
                                                        {value.Reports.length === 5 ? null : this.state.likes.includes(value.id) ?
                                                            <img onClick={e => this.downlike(value.id, index)} src="/liked.svg" alt='img' /> :
                                                            <img onClick={e => this.upLikes(value.id, index)} src="/unliked.svg" alt='img' />}
                                                             <span className="bolds">{this.state.postLikes[index]}Likes</span>
                                                       </div>
                                                       <div className='delete-icon'>
                                                            {this.state.username === 'admin' && 
                                                               <Icon type="delete" title='Delete the post 'className='icons'  onClick={()=>this.delete(value.id)}/>
                                                            }
                                                            {value.Reports.length === 5 || this.state.username === 'admin' ? null :
                                                                <img onClick={() => this.showConfirm(value.id)} title='Report the post' src='/report.svg' alt='img' />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <h2>{value.User.username}</h2>
                                                        <p>{value.content}</p>
                                                    </div>
                                                    <h4 style={{ display: 'flex' }} onClick={this.viewComments}>View All Comments</h4>
                                                    <div>
                                                        {this.state.isClicked ?
                                                            value.Comments.slice(0, 2).map(com =>
                                                                <div>
                                                                    <div className="content1">
                                                                        <div style={{ display: 'flex' }}>
                                                                            <h3>{com.User.username}</h3>
                                                                            <p style={{ color: 'black' }}>{com.comment}</p>
                                                                        </div>

                                                                        <div className='comment1'>
                                                                            <input type='text' className='comment-box1' placeholder="add reply"
                                                                                name='reply' onChange={this.onHandle} />
                                                                            <p className='reply' style={{ cursor: 'pointer' }}
                                                                                onClick={() => this.addReply(com.id)}>Reply</p>
                                                                        </div>
                                                                    </div>
                                                                    <div >
                                                                        {com.Replycomments.map((value,index) =>
                                                                            <div className='replycomments' key={index}>
                                                                                <div className='replycomment1'>
                                                                                    <h4>{value.reply}</h4>
                                                                                    <p>replied by.</p>
                                                                                </div>
                                                                                <p>@{value.User.username}</p>

                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                            ) :
                                                            value.Comments.map((com, index) =>
                                                                <div>
                                                                    <div className="content1" key={com.id}>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <h3>{com.User.username}</h3>
                                                                            <p style={{ color: 'black' }}>{com.comment}</p>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        {com.Replycomments.map((value) =>
                                                                            <div className='replycomments'>
                                                                                <div className='replycomment1'>
                                                                                    <h4>{value.reply}</h4>
                                                                                    <p>replied by.</p>
                                                                                </div>
                                                                                <p >@{value.User.username}</p>
                                                                            </div>

                                                                        )}

                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='comment'>
                                                        <input type='text' className='comment-box' name='comment' onChange={this.onHandle} placeholder='write a comment' />
                                                        <h3 style={{ color: 'blue', cursor: 'pointer' }} onClick={e => this.addComment(value.id)}>Post</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div></Spin></div>

                    </div>
                }
            </div>

        )
    }
}
export default Instapage;