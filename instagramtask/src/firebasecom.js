import React, { Component } from 'react'
import * as firebase from 'firebase';
import Signup from './Signup'
class firebasecom extends Component {


    render() {
        return (
            <div>
                <Signup onClick={this.OnSubmit} />
            </div>
        )
    }
}
export default firebasecom;