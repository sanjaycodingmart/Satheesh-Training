import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Instapage from './instapage';
import Profile from './Profile';
import friendslist from './friendslist';
import messages from './messages';


class App extends Component {

  

  render() {
    return (

      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Signup}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/insta" exact component={Instapage}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path='/userfriends' component={friendslist}></Route>
            <Route path='/chats' component={messages}></Route>
          </Switch>
        </div>
      </Router>

    );
  }

}

export default App;
