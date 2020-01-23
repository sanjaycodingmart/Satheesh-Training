import React, { Component } from 'react'
class Admin extends Component {
    state={
        visible:false,
        loading:false,
        Post_type:'',
        user_post:[],
        usrname:'',
        post:[]
    };
componentDidMount(){
    this.setState({
        loading:true
    })
    fetch('http://localhost:8080/admin')
        .then(response=>response.json())
            .then((data)=>{
                console.log(data.rows)
            });
}

    render() {
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
                 <Spin size="large" spinning={this.state.loading}>
                     <div className="grid-container">
                         <div className="reverse">
                            {this.state.post.map((value)=>( 
                         <div class="main-content" key={value.content}> 
                                <div className="post-nav">
                                    <div class="user">
                                        <h2>{value.username}</h2>
                                        <Icon type="ellipsis"  className="icons" />
                                    </div>  
                                    <div className="img-post">
                                        <img src={value.img_url} alt='image' className="main-img" />
                                    </div>
                                    <div style={{display:"flex"}}>
                                        <Icon type="heart" className='icons' />
                                        {/* <img src="/comment.jpeg" className="comment-img" /> */}
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
                </div></Spin>
                </div>
            </div>
        )
    }
}
export default Admin;