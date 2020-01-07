import React, { Component } from 'react'
import Image from "./Image"
import './css/style.css';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import * as firebase from 'firebase';
window.$img_array=[];

class Fetch extends Component {
    state = {
        books:'',
        Images:[],
        loading:false
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
      async getdetails(search_key) {
        var url='https://api.nytimes.com/svc/books/v3/lists/current/'+search_key+'.json?api-key=HUdzmG9oky8WRmLzxelOmioGiDHIm0VJ';
        var response=await fetch(url);
        var data=await response.json();
        var image=data.results.books.map((e=>e.book_image));
        // this.setState({
        //   Images:image
        // })
        const ref=firebase.database().ref("Image");
        ref.set(image);
        ref.on("value",gotdata,errordata);
        function gotdata(data){
          window.$img_array=data.val();
          console.log(window.$img_array)
        }
        function errordata(error){
           console.log(error)
        }
      }
      componentDidMount(){
        this.setState({loading:true})
        this.getdetails(this.props.name);
        setTimeout(()=>{
              this.setState({loading:false})
            },2000)
          }
      
      render() { 
            return(
            <main>
                <div>
                    <h1 className='heading'>Book Details</h1>
                </div>

                <div className='image'>
                    <Spin spinning={this.state.loading}>
                    <Image obj={window.$img_array}/>
                    </Spin>
                </div>
            </main>
            )
    }}
function mapStateToProps(state) {
      return {
           name: state.name 
          }
    }
export default connect(mapStateToProps) (Fetch);
