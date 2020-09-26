import React, { Component } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Endpoints from '../config/endpoints';
import { Link } from 'react-router-dom';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class Couriers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courierName: "",
            couriers: []
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }
    getAllCouriers () {
        axios({
            method: "GET",
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/courier`
        })
        .then(res => {
            this.setState({
                couriers : res.data.data
            })
        })
    }
    createNewCourier = (e) => {
        e.preventDefault();
        axios({
            method: "POST",
            data: {
                name: this.state.courierName
            },
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/courier`
        })
        .then(res => {
            console.log(res);
            this.getAllCouriers();
        })
        this.setState({courierName: ""});
    }
    componentDidMount () {
        this.getAllCouriers();
    }

    render() {
        return (
            <React.Fragment>
                 <Navbar>
                    <Navbar.Brand href="#home">Courier App</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                    <Nav.Link>
                        <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/couriers">Couriers</Link>
                    </Nav.Link>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {this.props.currentUser.username} 
                        </Navbar.Text>
                        <Link to="/">
                        <Button onClick={this.handleLogOut}>Log Out</Button>
                    </Link>
                    </Navbar.Collapse>
                </Navbar>
                <h3>Create new courier</h3>
                <div className="new-courier-container">
                <Form onSubmit={this.createNewCourier}>
                    <Form.Row className="align-items-center">
                        <Col xs="auto">
                        <Form.Label htmlFor="courierName" srOnly>
                            Name
                        </Form.Label>
                        <Form.Control
                            className="mb-2"
                            id="courierName"
                            placeholder="Courier name"
                            value={this.state.courierName}
                            onChange={this.handleChange}
                        />
                        </Col>
                        <Col xs="auto">
                        <Button type="submit" className="mb-2">
                            Create
                        </Button>
                        </Col>
                    </Form.Row>
                </Form>
                </div>
                <div className="request-container">
                    {this.state.couriers !== undefined ? 
                        this.state.couriers.map((item, index) => {
                            return(
                                <Card key={item._id} style={{ width: '30rem' }}>
                                <Card.Body>
                                    <Card.Title>Name: {item.name}</Card.Title>
                                    <Card.Text>Courier ID: {item._id}</Card.Text>
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

export default Couriers
