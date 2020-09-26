import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Endpoints from '../config/endpoints';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            error: ""
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }
    handleSubmit = (event) =>  {
        event.preventDefault();
        console.log('sending new request');
        axios({
            method: "POST",
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                typeIndicator: 1
            },
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/signup`
        })
        .then( res => {
            if(res.status) {
                this.props.history.push("/");
            };
            }
        )
    }
    render() {
        return (
            <React.Fragment>
                <h1>Courier App</h1>
                <div className="login-container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control id="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control id="username" type="text" placeholder="Enter username" value={this.state.signup} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    {this.state.error !== "" ?
                        <Alert variant="warning">
                        {this.state.error}
                      </Alert>
                    : ''}
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
                </div>
                <div>
                    <p>Don't have an account? <Link to="/">Login</Link></p>
                </div>
            </React.Fragment>
        )
    }
}

export default Login
