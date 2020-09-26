import React, { Component } from 'react'
import Login from '../components/Login';
import AdminHome from '../components/AdminHome';
import CustomerHome from  '../components/CustomerHome';

export class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <React.Fragment>
                {!this.props.isLogIn ? 
                <Login
                    isLogIn={this.props.isLogIn}
                    loginEmail={this.props.loginEmail}
                    loginPassword={this.props.loginPassword}
                    handleChange={this.props.handleChange}
                    login={this.props.login}
                    error={this.props.error}
                />
                : 
                this.props.typeIndicator === 2 ?
                    <AdminHome 
                        currentUser={this.props.currentUser}
                    />
                :
                    <CustomerHome 
                        currentUser={this.props.currentUser}
                    />
            }
            </React.Fragment>
        )
    }
}

export default Home
