import React, { Component } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Endpoints from '../config/endpoints';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class ProcessRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            package: "",
            couriers: [],
            status: [
                "Processing",
                "In Progress",
                "Delivered"
            ],
            selectedStatus: "",
            selectedCourier: "",
            error: ""
        }
    }
    getPackageDetails () {
        axios({
            method: "GET",
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/package/get/${this.props.match.params.id}`
        })
        .then(res => {
            this.setState({
                package : res.data.data,
                selectedStatus: res.data.data.status,
                selectedCourier: res.data.data.courierName
            })
        })
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
    handleSubmit = (event) => {
        event.preventDefault();
        console.log('updating request');
        let courierId = 0;
        for (let i = 0; i < this.state.couriers.length; i++) {
            if (this.state.couriers[i].name === this.state.selectedCourier) {
                courierId = this.state.couriers[i]._id
            }
        }
        console.log('courier Id is',courierId);
        axios({
            method: "PUT",
            data: {
                courierId: courierId,
                courierName: this.state.selectedCourier,
                status: this.state.selectedStatus
            },
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/package/assign/${this.state.package._id}`
        })
        .then( res => {
            if(res.status) {
                this.props.history.push("/");
            };
            }
        )
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }
    componentDidMount() {
        this.getPackageDetails();
        this.getAllCouriers();
    }
    render() {
        return (
            <React.Fragment>
                <div className="request-container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <h2>Request number {this.state.package.requesterId} by {this.state.package.requesterName}</h2>
                        <Form.Label>Delivery content</Form.Label>
                        <Form.Control placeholder={this.state.package.contents} disabled />
                        <Form.Label>Pickup Address</Form.Label>
                        <Form.Control placeholder={this.state.package.pickupAddress} disabled />
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control placeholder={this.state.package.deliveryAddress} disabled />
                        <Form.Group>
                            <Form.Label>Courier</Form.Label>
                            <Form.Control as="select" id="selectedCourier" value={this.state.selectedCourier} onChange={this.handleChange}>
                            {this.state.couriers !== undefined ? 
                            this.state.couriers.map((courier, index) => {
                                return(
                                    <option value={courier.name}>{courier.name}</option>
                                )
                            })
                            :''}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" id="selectedStatus" value={this.state.selectedStatus} onChange={this.handleChange}>
                            {this.state.status !== undefined ? 
                            this.state.status.map((status, index) => {
                                return(
                                    <option value={status}>{status}</option>
                                )
                            })
                            :''}
                            </Form.Control>
                        </Form.Group>
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

export default ProcessRequest
