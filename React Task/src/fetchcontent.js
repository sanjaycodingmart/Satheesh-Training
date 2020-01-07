import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import './css/style.css';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

window.$array=[];
class Content extends Component {
   
       state={
             names:[],
             loading:false
        }
        async get_api(){
            console.log("Fetched!!")
            const ref=firebase.database().ref("fetch");
            var url='https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=HUdzmG9oky8WRmLzxelOmioGiDHIm0VJ';
            var response=await fetch(url);
            var data= await response.json();
            let list_names=[];
            data.results.forEach(element => {
                list_names.push(element.list_name_encoded);
            });
                // this.setState({
                //     names:list_names
                // })
                ref.set(list_names);
                ref.on("value",got,err)
                function got(data){
                   window.$array=data.val()
                }
                function err(e) {
                    console.log(e)                    
                }
        }
    
        handleSubmit=()=>{
            this.get_api();
            this.setState({loading:true});
             setTimeout(()=>{
                 this.setState({loading:false})
             },1000)
        }
        clickevnt=(value)=>{
             this.props.dispatch({
                 type:'CHANGE_BOOK',
                 payload: value
                }) 
        }
      
    render() { 
        return ( 
            <div>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>ListBooks</Button>
                <Spin spinning={this.state.loading}>
                    <div>
                        { window.$array.map((value) => 
                        (
                            <div>
                                <Link to="/home/fetch">
                                    <h2 onClick={()=>this.clickevnt(value)}>{value}</h2>
                                </Link>                    
                            </div>
                        )  
                        )}
                    </div>
               </Spin>
            </div>
         );
    }
}
function mapStateToProps(state) {
    return {
         name: state.name 
        }
}

export default connect(mapStateToProps)(Content);
