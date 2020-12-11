/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, FlatList, TouchableOpacity, TouchableHighlightBase, Dimensions, TouchableNativeFeedback } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root, Button, List, ListItem, Left, Body, Right, Drawer } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import HeaderHome from './Partials/HeaderHome'
import Sidebar from './Partials/Sidebar'

import { connect } from 'react-redux'
import realm, { creatUser, updateUser, deleteUser, getUser, getUsers, getWallets } from "../databases/schemas"
import { TouchableHighlight } from 'react-native-gesture-handler';


class Forum extends Component {



    constructor(props) {
        super(props)
        this.state = {
            transactions: [
                {id : 1, amount : 134, operation : "-", currency : "USD", date : "10 Nov 2020", description : "Send money to Alvin Bauma"},
                {id : 2, amount : 453, operation : "+", currency : "USD", date : "09 Nov 2020", description : "Recharge money on principal wallet with Airtel money"},
                {id : 3, amount : 567, operation : "-", currency : "USD", date : "30 Nov 2020", description : "Money received from Marcelin wabo"},
                {id : 4, amount : 13.9, operation : "-", currency : "USD", date : "01 Oct 2020", description : "Send money to Alvin Bauma"},
                {id : 5, amount : 1345, operation : "+", currency : "USD", date : "04 Nov 2020", description : "Lorem ipsum...."},
                {id : 6, amount : 542, operation : "+", currency : "USD", date : "06 Nov 2020", description : "Lorem ipsum money...."},
                {id : 7, amount : 6.5, operation : "-", currency : "USD", date : "10 Nov 2020", description : "Lorem ipsum...."},
                {id : 8, amount : 45, operation : "+", currency : "USD", date : "09 Nov 2020", description : "Money received from Rwabank transfer"},
                {id : 9, amount : 503, operation : "+", currency : "USD", date : "06 Nov 2020", description : "Money received from Marcelin wabo"},
                {id : 10, amount : 1000, operation : "-", currency : "USD", date : "10 Nov 2020", description : "Send money to Alvin Bauma"},
                {id : 11, amount : 1000, operation : "+", currency : "USD", date : "09 Nov 2020", description : "Recharge money on principal wallet with Airtel money"},
                {id : 12, amount : 134, operation : "+", currency : "USD", date : "06 Nov 2020", description : "Money received from Marcelin wabo"},
                {id : 13, amount : 34, operation : "-", currency : "USD", date : "10 Nov 2020", description : "Send money to Alvin Bauma"},
                {id : 14, amount : 345, operation : "+", currency : "USD", date : "09 Nov 2020", description : "Recharge money on principal wallet with Airtel money"},
                {id : 15, amount : 1245, operation : "+", currency : "USD", date : "06 Nov 2020", description : "Money received from Marcelin wabo"}
            ]
        }
    }

    componentDidMount() {
        //this.reloadDataUsers();
    }

    closeDrawer = () => {
        this._drawer._root.close();
    }


    openDrawer = () => {
        this._drawer._root.open();
    }

    _transactionDetail(transaction){
        alert("Get detail transactions");
    }


    render() {
        //console.log("User in store", this.props)
        return (
            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                content={<Sidebar closeDrawer={this.closeDrawer.bind(this)} navigation={this.props.navigation} />} >
                <Container style={styles.container}>
                    <HeaderHome onPress={this.openDrawer.bind(this)} title={"Transactions"} />
                    <FlatList
                        style={{ paddingLeft: 5 }}
                        scrollIndicatorInsets={false}
                        data={this.state.transactions}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <TouchableNativeFeedback onPress={() => this._transactionDetail(item)} >
                                    <View style={{ ...styles.card_transaction, borderLeftColor: (item.operation == "+") ? "#1b8ce3" : "red" }}>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 13 }}>{item.date}</Text>
                                        </View>

                                        <View style={{ flex: 2 }}>
                                            <Text style={{ fontSize: 13 }}>{item.description}</Text>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={{ textAlign: 'right', fontWeight: 'bold', color: (item.operation == "+") ? "#1b8ce3" : "red" }}>{item.currency} {item.amount}</Text>
                                        </View>

                                    </View>
                                </TouchableNativeFeedback>
                            )
                        }}
                    />
                </Container>

            </Drawer>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list_accounts: {
        flex: 5,
        paddingVertical: 10
    },
    card_transaction: {
        backgroundColor: '#fcfcfc',
        padding: 10,
        paddingVertical: 20,
        borderBottomRightRadius: 15,
        margin: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 2,
        borderLeftWidth: 3,
        flexDirection: 'row',
        alignItems : 'center'
    }

});

//connecter le state de notre application au component AddCustomer
const mapStateToProps = (state) => {
    return {
        user_data: state.account.user_data,
        user_connected: state.account.user_connected
    }
}

export default connect(mapStateToProps)(Forum)
