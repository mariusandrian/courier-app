import React, { Component } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Endpoints from '../config/endpoints';
import { Link } from 'react-router-dom';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class CustomerHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requests: []
        }
    }
    getRequests = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/package/submit/${this.props.currentUser._id}`
        })
        .then(res => {

            this.setState({
                requests : res.data.data
            })
        })
    }
    componentDidMount () {
        this.getRequests();
    }
    render() {
        return (
            <React.Fragment>
                <h1>Courier App</h1>
                <h2>Welcome,  {this.props.currentUser.username}</h2>
                <Link to="/new"><Button>Create New Request</Button></Link>
                <div className="request-container">
                    {this.state.requests !== undefined ? 
                        this.state.requests.map((item, index) => {
                            return(
                                <Card key={item._id} style={{ width: '30rem' }}>
                                <Card.Body>
                                    <Card.Title>Request number {item._id}</Card.Title>
                                    <Card.Text>Contents: {item.contents}</Card.Text>
                                    <Card.Text>Pickup Address: {item.pickupAddress}</Card.Text>
                                    <Card.Text>Delivery Address: {item.deliveryAddress}</Card.Text>
                                    <Card.Text>Status: {item.status}</Card.Text>
                                </Card.Body>
                                </Card>
                            )
                        })
                    : ''}
                </div>

            </React.Fragment>
        )
    }
}

export default CustomerHome
