import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Endpoints from '../config/endpoints'

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class NewRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contents: "",
            pickupAddress: "",
            deliveryAddress: "",
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
                requesterName: this.props.currentUser.username,
                requesterId: this.props.currentUser._id,
                contents: this.state.contents,
                pickupAddress: this.state.pickupAddress,
                deliveryAddress: this.state.deliveryAddress,
                status: "Processing"
            },
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/package`
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
                <h1>Create New Request</h1>
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Delivery content</Form.Label>
                        <Form.Control 
                            id="contents" 
                            type="text" 
                            placeholder="Enter content of delivery" 
                            value={this.state.contents} 
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Pickup Address</Form.Label>
                        <Form.Control 
                            id="pickupAddress" 
                            type="text" 
                            placeholder="Pickup address" 
                            value={this.state.pickupAddress} 
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control 
                            id="deliveryAddress" 
                            type="text" 
                            placeholder="Destination address" 
                            value={this.state.deliveryAddress} 
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>
                    {this.state.error !== "" ?
                        <Alert variant="warning">
                        {this.state.error}
                      </Alert>
                    : ''}
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            </React.Fragment>
        )
    }
}

export default NewRequest
