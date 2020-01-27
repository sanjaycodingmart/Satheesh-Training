import React, { Component } from 'react'
import { Icon, Spin } from 'antd';
import './instapage.css';
import Axios from 'axios';

class Instapage extends Component {
    state = {
        visible: false,
        Post_type: '',
        user_post: [],
        usrname: '',
        loading: false,
        post: [],
        username: ''
    };

    redirect = () => {
        this.props.history.push({
            pathname: '/login/insta/profile',
        });
    }
    componentDidMount() {
        this.setState({
            loading: true
        })
        fetch('http://localhost:5003/instapage')
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    post: data,
                    loading: false
                });
            })
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
    render() {
        let myId = localStorage.getItem('userDetails')
        console.log(this.state.post)
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
                            <input type="text" className="search-tag" type="text" placeholder="Search" autoCapitalize="none" />
                        </div>
                        <div class="right-icons">
                            <Icon type="compass" className="icons" />
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
                                {this.state.post.map((value) => (
                                    <div class="main-content" key={value.content}>
                                        <div className="post-nav">
                                            <div class="user">
                                                <h2>{value.User.username}</h2>
                                                <Icon type="ellipsis" className="icons" />
                                            </div>
                                            <div className="img-post">
                                                <img src={value.img_url} alt='image' className="main-img" />
                                            </div>
                                            <div style={{ display: "flex" }}>
                                                <Icon type="heart" className='icons' />
                                                <div>
                                                    <Icon type="book" className="icons" />
                                                    {myId === '2' && <button id={value.id} onClick={this.delete}>delete</button>}
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h2>{value.User.username}</h2>
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
export default Instapage;