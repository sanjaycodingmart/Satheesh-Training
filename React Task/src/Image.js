import React, { Component } from "react";
import {Link} from 'react-router-dom';
import './css/style.css';
// import Download from './download'
// import {saveAs} from './download';
// import './download';
// function download(value){
//     saveAs(value);
// }
class Image extends Component {
   
    render() { 
        let imgArray= this.props.obj;
        return ( 
        <React.Fragment>
     {
            imgArray.map((value,index)=>
            
                <div id="img" key={index}style={{position:'relative'}}>
                    {/* <a href="https://s1.nyt.com/du/books/images/9780393254600.jpg" download>
                    <img style={{width:"300px", height:"500px"}} 
                        src={value} className='image' onClick={() => {}}  alt="Images"/>
                    </a> */}
                    <Link to ="/" download target="_self"><img style={{width:"300px", height:"500px"}} 
                        src={value} className='image' onClick={() => {}}  alt="Images"/></Link>
                    <img src="/download.png" className="middle" />
                </div>
            )
        }
        </React.Fragment>)

    }
}
export default Image;