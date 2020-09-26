import React, { Component } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import NewRequest from './components/NewRequest';
import ProcessRequest from './components/ProcessRequest';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import Endpoints from './config/endpoints';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: "",
        _id: "",
      },
      loginEmail: "",
      loginPassword: "",
      isLogIn: false,
      error: ""
      // signupUsername: "",
      // signupPassword: "",
      // signupEmail: "",
    }
  }


  // Check User Authentication
  checkAuthentication = async () => {
    if (localStorage.getItem('currentUser')) {
      console.log('into if statement')
      const currentUser = localStorage.getItem('currentUser');
      const typeIndicator = localStorage.getItem('typeIndicator');
      console.log(currentUser)
      const parsedUser = JSON.parse(currentUser);
      console.log(parsedUser)
      const stateUser = {
        _id: parsedUser.username,
        user_id: parsedUser._id
      }
      console.log(stateUser);
      this.setState({
        isLogIn: true,
        currentUser: {
          ...this.state.currentUser,
          _id: parsedUser._id,
          username: parsedUser.username
        },
        typeIndicator: typeIndicator
      })
    }
  }
  login = (e) => {
    e.preventDefault();
    axios({
        method: "POST",
        data: {
            email: this.state.loginEmail,
            password: this.state.loginPassword
        },
        withCredentials: true,
        url: `${REACT_APP_SERVER_URL}/login`
    })
    
    .then( res => {
        if ("_id" in res.data.data) {

          const currentUser = {
              _id: res.data.data._id,
              username: res.data.data.username
          }
          const id = res.data.data._id;
          const username= res.data.data.username;
          // set local storage
          localStorage.setItem('isLogIn', true);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          localStorage.setItem('typeIndicator', res.data.data.typeIndicator)
          this.setState({
            isLogIn: true,
            currentUser: {
              ...this.state.currentUser,
              _id: id,
              username: username
            },
            loginEmail: "",
            loginPassword: "",
            error: "",
            typeIndicator: res.data.data.typeIndicator
          })
        } else if ("err" in res.data.data) {
          this.setState({
            error: res.data.data.err
          })
        }
    }
    ).catch( error => {
        console.log(error.response.data.error);
        this.setState({
          error: error.response.data.err
        })
    });
  };
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  // Logout
  logout = () => {
    console.log('trying to logout in FE')
    localStorage.clear();
    this.resetAppState();
  }

  resetAppState = () => {
    this.setState({
      currentUser: {
        username: "",
        _id: "",
        },
      loginEmail: "",
      loginPassword: "",
      isLogIn: false,
      error: ""
    })
  }
  componentDidMount () {
    this.checkAuthentication();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="header-body">
              <Switch>
                <Route exact path="/" render={(props) => 
                  <Home 
                    {...props}
                    isLogIn={this.state.isLogIn}
                    loginEmail={this.state.loginEmail}
                    loginPassword={this.state.loginPassword}
                    handleChange={this.handleChange}
                    login={this.login}
                    error={this.state.error}
                    currentUser={this.state.currentUser}
                    logout={this.logout}
                    typeIndicator={this.state.typeIndicator}
                  />          
                }
                />
                <Route exact path="/new" render={(props) =>
                localStorage.getItem('isLogIn') ?
                  <NewRequest
                    {...props}
                    currentUser={this.state.currentUser}
                  />
                  : <Redirect to="/"/>
                }
                />
                <Route path="/request/process/:id" render={(props)=>
                    <ProcessRequest
                      {...props}
                      currentUser={this.state.currentUser}
                      logout={this.logout}
                    />} 
                  />
                <Route exact path="/signup" render={(props) => 
                  <SignUp
                    {...props}
                  />
                }
                />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;