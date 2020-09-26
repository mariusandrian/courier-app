import React, { Component } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Endpoints from '../config/endpoints';
import { Link } from 'react-router-dom';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class AdminHome extends Component {
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
            url: `${REACT_APP_SERVER_URL}/package`
        })
        .then(res => {
            this.setState({
                requests : res.data.data
            })
        })
    }
    handleLogOut = () => {
        this.props.logout();
    }
    handleEdit(e) {
        const key = e.currentTarget.id;
        window.location.href = `/request/process/${key}`;
    }
    componentDidMount () {
        this.getRequests();
    }
    render() {
        return (
            <React.Fragment>
                <Navbar>
                    <Navbar.Brand href="#home">Courier App</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {this.props.currentUser.username} 
                        </Navbar.Text>
                        <Link to="/">
                        <Button onClick={this.handleLogOut}>Log Out</Button>
                    </Link>
                    </Navbar.Collapse>
                </Navbar>
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
                                    <Card.Text>Courier: {item.courierId}</Card.Text>
                                    <Card.Text>Status: {item.status}</Card.Text>
                                    <Button id={item._id} onClick={this.handleEdit}>Process Request</Button>
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

export default AdminHome
