/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, AsyncStorage, FlatList } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root, Button, List, ListItem, Left, Body, Right } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import realm, { createWallet, getWallets } from "../../databases/schemas"



class CreateWallet extends Component {



    constructor(props) {
        super(props)
        this.state = {
            wallets: []
        }
    }

    componentDidMount() {
        this.reloadDataWallets();
    }

    reloadDataWallets = () => {
        getWallets().then((wallets) => {
            console.log("wallets getted", wallets);
            this.setState({ wallets });
        }).catch(error => {
            console.log("erreor when get uesrs", error)
        })
    }

    creatWallet = () => {

        const wallet = {
            id: Math.floor(Date.now()),
            created: new Date(),
            modified: new Date(),
            activated: "1",
            user_id : 1603726413767,
            name: "Compte AVEC 2",
            description: "Mon compte de test",
            color: "#f5f55f",
            currency: "CDF",
            amount: 2345,
            saving: "0",
            principal: "1",
            bank: "0"
        }

        createWallet(wallet).then((res) => {
            alert("wallet created");
            this.reloadDataWallets();
        }).catch(error => {
            alert("error created");
            console.log("Erreur lors creation wallet", error);
        })

    }


    render() {
        //console.log("User in store", this.props)
        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar backgroundColor="#334c66" barStyle="light-content" />
                    <Content>
                        <Text>Liste des portefeuilles</Text>

                        <Button onPress={() => this.creatWallet()} style={{ ...styles.button, width: "100%" }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#1c1c1c' }}>CREER WALLET</Text>
                        </Button>

                        <View style={{ width: '100%', padding: 10 }}>
                            {this.state.wallets.map(wallet => {
                                return (
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} key={wallet.id}>
                                        <Text style={{ fontWeight: "bold" }}>Compte name : {wallet.name} </Text>
                                        <Text note style={{ marginTop: 5 }}>Compte user : {wallet.user_id}</Text>
                                        <Text note style={{ marginTop: 5 }}>Montant : {wallet.amount}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </Content>

                </Container>
            </Root>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding : 16
    }

});

//connecter le state de notre application au component AddCustomer
const mapStateToProps = (state) => {
    return {
        user_data: state.account.user_data,
        user_connected: state.account.user_connected
    }
}

export default connect(mapStateToProps)(CreateWallet)
