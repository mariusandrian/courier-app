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
    }
    render() {
        return (
            <React.Fragment>
                <h1>Courier App</h1>
                <div className="login-container">
                <Form onSubmit={this.props.login}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control id="loginEmail" type="email" placeholder="Enter email" value={this.props.loginEmail} onChange={this.props.handleChange}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="loginPassword" type="password" placeholder="Password" value={this.props.loginPassword} onChange={this.props.handleChange}/>
                    </Form.Group>
                    {this.props.error !== "" ?
                        <Alert variant="warning">
                        {this.props.error}
                      </Alert>
                    : ''}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </div>
                <div>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </React.Fragment>
        )
    }
}

export default Login
