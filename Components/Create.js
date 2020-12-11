/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, AsyncStorage, FlatList } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root, Button, List, ListItem, Left, Body, Right } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'


class Create extends Component {



    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        //this.reloadDataUsers();
    }

    _catPage() {
        this.props.navigation.navigate('createCategory')
    }

    _walletPage() {
        this.props.navigation.navigate('createWallet')
    }

    render() {
        //console.log("User in store", this.props)
        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar backgroundColor="#db2c6f" barStyle="light-content" />
                    

                    <Button style={{...styles.button, backgroundColor : '#334c66'}} onPress={() => this._catPage()}><Text>Recharge your account</Text></Button>
                    <Button style={{...styles.button, backgroundColor : '#1b8023'}} onPress={() => this._walletPage()}><Text>Transfer money</Text></Button>

                </Container>
            </Root>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding : 20
    },
    button: {
        backgroundColor: 'white',
        height: 60,
        marginBottom: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
        width : '100%'
    },

});

//connecter le state de notre application au component AddCustomer
const mapStateToProps = (state) => {
    return {
        user_data: state.account.user_data,
        user_connected: state.account.user_connected
    }
}

export default connect(mapStateToProps)(Create)
