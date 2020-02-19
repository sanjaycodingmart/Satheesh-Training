import React, { Component } from 'react'
import { Button } from 'antd'
import './chat.css';
import Axios from './axios'
import { Icon } from 'antd'
import { Link } from 'react-router-dom';

var io = require('socket.io-client')

export default class messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            names: [],
            ulist: false,
            open: false,
            messageObj: {},
            message: '',
            messages: [],
            id: this.props.location.state.id,
            username: this.props.location.state.username,
            profile: this.props.location.state.userimage,
            socket: io.connect('http://localhost:5003/' + this.props.location.state.id)
        }
    }

    checklocalstorage = () => {
        if (!localStorage.length) {
            this.props.history.push('/login')
        }
    }
    getChats = () => {
        var recvid = String(this.props.location.state.userId)
        Axios.get(`/getchats?recvid=${recvid}`, {
            headers: {
                Authorization: localStorage.getItem('userDetails')
            }
        }).then(data => {
            console.log(data)
            this.setState({
                messages: data.data
            })
        })
    }

    Logout = () => {
        localStorage.removeItem('userDetails');
        this.props.history.push('/login');
    }
    componentDidMount = () => {
        console.log(this.props)
        let scope = this
        this.checklocalstorage();
        if (this.props.location.state.userId) {
            this.getChats();
            this.openChat(this.props.location.state)
        }
        this.state.socket.on('send message', function (data) {
            let { messages } = scope.state
            console.log(data, messages)
            scope.setState({
                messages: [...messages, data]
            })
        })
    }
    userList = async (event) => {
        if (event.target.value !== '') {
            Axios.get(`/usernames?username=${event.target.value}`)
                .then(({ data }) => {
                    console.log(data)
                    this.setState({
                        names: data
                    })
                }).then(() => {
                    this.setState({
                        ulist: !false
                    })
                })
        } else {
            this.setState({
                ulist: false
            })
        }
    }
    onhandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.state) {
            if (prevProps.location.state.userId != this.props.location.state.userId) {
                this.openChat(this.props.location.state)
                this.getChats();
            }
        } else if (this.props.location.state) {
            this.openChat(this.props.location.state)
            this.getChats();
        }

    }
    openChat = (data) => {
        this.setState({
            open: true,
            ulist: false,
            messageObj: data
        })
    }
    Keypress = (e) => {
        if (e.which === 13) {
            this.sendMessage();
        }
    }
    sendMessage = () => {
        if (this.state.message) {
            let { messages } = this.state
            let message = { Messages: this.state.message, senderId: this.state.id }
            this.setState({
                messages: [...messages, message],
                message: ""
            })
        }

        this.state.socket.emit('insert to message', {
            message: this.state.message,
            senderid: this.state.id,
            receiverid: this.state.messageObj.userId
        })
    }
    render() {

        return (
            <div className="msg-container">
                <div className="header">
                    <div className="Profile1">
                        <img src={this.state.profile} alt='img' />
                        <h2>{this.state.username}</h2>
                        <div className="chat">
                            <Button type="primary" onClick={this.Logout}>Logout</Button>
                        </div>
                    </div>

                </div>
                <div className="body">
                    {this.state.open &&
                        <div style={{ height: '98%', margin: '1%', position: 'relative' }}>
                            <div className="body-nav">
                                <div className="body-navpro">
                                    <Icon type="left" className="icons" />
                                    <img className="progile_image" src={this.state.messageObj.profile || null} alt="img" />
                                </div>

                                <div>
                                    <h2>{this.state.messageObj.userName || null}</h2>
                                </div>
                                <Icon type="more" className="icons" />

                            </div>
                            <div className="message-body">
                                <div style={{ height: "90%", overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                                    {this.state.messages.map((msg) =>
                                        <div className={`message${msg.senderId == this.state.id ? '' : '1'}`}>
                                            {msg.Messages}
                                        </div>
                                    )}

                                </div>
                                <div className="chat-box">
                                    <Icon type="smile" className="icons" theme="twoTone" />
                                    <input value={this.state.message} type="text" className="search-tag" placeholder="Type your message here"
                                        autoComplete="off" autoCorrect="false" name='message'
                                        autoCapitalize="none" onChange={this.onhandle} onKeyPress={this.Keypress} />
                                    <img src='./send.png' onClick={this.sendMessage} alt='sendMessage' />
                                    <Icon type="audio" className="icons" />
                                </div>

                            </div>
                        </div>
                    }
                </div>
                <div className="right-container">
                    <input type="text" className="search-tag" autoComplete="off"
                        onChange={this.userList} autoCorrect="false" placeholder="Search your friend" autoCapitalize="none" />
                    {this.state.ulist &&
                        <div id="myDropdown" className="dropdown-content">
                            {this.state.names.map((value, index) => (
                                <div className="friends" key={index}>
                                    <img src={value.profile} alt='img' />
                                    <span>{value.username} </span>
                                    <div style={{ cursor: 'pointer' }}>
                                        <Link to={{
                                            pathname: '/chats',
                                            state: {
                                                id: this.state.id,
                                                userprofile: this.state.profile,
                                                username: this.state.username,
                                                userId: value.id,
                                                userName: value.username,
                                                profile: value.profile
                                            }
                                        }}>
                                            Message
                                            </Link>
                                    </div>
                                </div>
                            ))}
                        </div>}


                </div>


            </div>
        )
    }
}
