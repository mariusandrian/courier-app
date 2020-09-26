import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    constructor(props) {
        super(props)
    }
    handleLogOut = () => {
        this.props.logout();
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
            </React.Fragment>
        )
    }
}

export default Navbar
