/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainNav from './MainNav';


class InitNavigation extends Component {



    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        console.log("User is connected via init Nav", this.props.user_connected)
    }


    render() {
        //console.log("User in store", this.props)
        return (
            <MainNav userConnected={this.props.user_connected} />
        );
    }
}

//connecter le state de notre application au component AddCustomer
const mapStateToProps = (state) => {
    return {
        user_data: state.account.user_data,
        user_connected: state.account.user_connected
    }
}

export default connect(mapStateToProps)(InitNavigation)
