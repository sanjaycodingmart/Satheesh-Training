import React, { Component } from 'react'
import { Icon, Spin, Modal} from 'antd';

import './instapage.css';
import Axios from 'axios';
const { confirm }=Modal;
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
        report:[],
        isClicked: true,
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
            onOk() { },
        });
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

    redirect = () => {
        this.props.history.push('/profile');
    }
    getName = (name) => {
        Axios.get(`http://localhost:5003/name?id=${name}`)
            .then((data) => {
                this.setState({
                    username: data.data.username
                });
                console.log(this.state.username)
            });
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        this.ref()
        this.checklocalstorage();
        this.fetchReport();
        this.getName(localStorage.getItem('userDetails'));
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
    ref() {
        fetch('http://localhost:5003/instapage')
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    post: data,
                    loading: false
                });
                this.fetchLikes(data);
            });

    }
    delete = (e) => {
        if (window.confirm('Do you Want really delete this post?')) {
            console.log(e.target.id)
            Axios.post('http://localhost:5003/deletepost', {
                id: e.target.id
            }).then((data) => {
                console.log(data)
            })
            window.location.reload();
        }

    }
    upLikes = (id, index) => {
        var userid = localStorage.getItem('userDetails');
        let { likes, postLikes } = this.state;
        postLikes[index] += 1
        likes.push(id)
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
        var userid = localStorage.getItem('userDetails');
        var postid = e;
        let { likes, postLikes } = this.state;
        postLikes[index] -= 1
        likes.splice(likes.indexOf(e), 1)
        this.setState({
            likes,
            postLikes
        })
        Axios.post('http://localhost:5003/dislike', {
            userid, postid
        }).then((data) => {
            console.log(data)
        })
    }
    addComment = (e) => {
        var userid = localStorage.getItem('userDetails')
        var id = e
        var comment = this.state.comment
        Axios.post('http://localhost:5003/comment', {
            id, comment, userid
        }).then((data) => {
            console.log('response for comment', data)
        }).then(window.location.reload());
    }
    viewComments = () => {
        this.setState({
            isClicked: !this.state.isClicked
        })
    }
    addReply = (e) => {
        var userid = localStorage.getItem('userDetails')
        console.log(e)
        var reply = this.state.reply
        Axios.post('http://localhost:5003/reply', {
            e, userid, reply
        }).then((data) => {
            console.log(data)
        }).then(() => {
            this.ref()
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
                            <Icon type="user" className="icons" onClick={this.redirect} />
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
                                                    <img src={value.img_url} alt='img'style={{ width: '100%'}}/>
                                                    </div>}
                                                {/* <img src={value.Reports.length === 5 ? './blocked.png' : value.img_url} alt='img' className="main-img" /> */}
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                    {value.Reports.length===5?null:this.state.likes.includes(value.id) ?
                                                    <img onClick={e => this.downlike(value.id, index)} src="/liked.svg" alt='img' /> :
                                                    <img onClick={e => this.upLikes(value.id, index)} src="/unliked.svg" alt='img' />}
                                                <h3>{this.state.postLikes[index]}Likes</h3>
                                                <div>
                                                    {this.state.username === 'admin' && <button id={value.id} onClick={this.delete}>delete</button>}
                                                    {value.Reports.length === 5 || this.state.username === 'admin' ? null :
                                                        <img onClick={() => this.showConfirm(value.id)} src='/report.svg' alt='img' />
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
                                                                {com.Replycomments.map((value) =>
                                                                    <div className='replycomments'>
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


                                                                <div className='comment1'>
                                                                    <input type='text' className='comment-box1' placeholder="add reply..."
                                                                        name='reply' onChange={this.onHandle} />
                                                                    <p style={{ cursor: 'pointer' }} onClick={() => this.addReply(com.id)}>Reply</p>
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

        )
    }
}
export default Instapage;