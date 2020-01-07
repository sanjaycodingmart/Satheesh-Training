import React, { Component } from 'react'
import Main from './info';
import Fetch from './Fetch';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Root from './root';
import {Provider} from 'react-redux'
import store from './store'

class App extends Component {
    // state={
    //     name:'hardcover-advice'
    // }
    // fuctn = (code)=>{
    //     this.setState({
    //         name:code
    //     })
    //     console.log('value came:');      
    // }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Main}></Route>
                        <Route exact path="/home" component={Root}></Route>
                        <Route exact path="/home/fetch" component={Fetch}></Route>
                        {/* <Route exact path="/home" render={(props) => <Root name={this.state.name} setName={this.fuctn} {...props} />}></Route>
                        {/* <Route exact path="/home" render={(props)=> <Root name={this.state.name} />}></Route> */}
                        {/* <Route exact path='/home/fetch' render={()=> <Fetch name={this.state.name} />}></Route> */} 
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App ;