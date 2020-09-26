import React, { Component } from 'react'

export class AdminHome extends Component {
    render() {
        return (
            <div>
                <h1>Courier App</h1>
                <h2>Welcome,  {this.props.currentUser.username}</h2>
            </div>
        )
    }
}

export default AdminHome
