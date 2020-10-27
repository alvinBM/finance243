/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, FlatList, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root, Button, List, ListItem, Left, Body, Right, Drawer } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import HeaderHome from './Partials/HeaderHome'
import Sidebar from './Partials/Sidebar'

import { connect } from 'react-redux'
import realm, { creatUser, updateUser, deleteUser, getUser, getUsers, getWallets } from "../databases/schemas"
import { TouchableHighlight } from 'react-native-gesture-handler';


class Home extends Component {



    constructor(props) {
        super(props)
        this.state = {
            wallets: []
        }
    }

    componentDidMount() {
        this.reloadDataWallets();
    }


    closeDrawer = () => {
        this._drawer._root.close();
    }


    openDrawer = () => {
        this._drawer._root.open();
    }

    // reloadDataUsers = () => {
    //     getUsers().then((users) => {
    //         console.log("Users getted", users);
    //         this.setState({ users });
    //     }).catch(error => {
    //         console.log("erreor when get uesrs", error)
    //     })
    // }

    reloadDataWallets = () => {
        getWallets().then((wallets) => {
            console.log("wallets getted", wallets);
            this.setState({ wallets });
        }).catch(error => {
            console.log("erreor when get uesrs", error)
        })
    }

    creerUser = () => {

        const user = {
            id: Math.floor(Date.now()),
            fullname: "Alvin bauma ",
            created: new Date(),
            modified: new Date(),
            activated: "1",
            phone: "+243998883773",
            email: "hemrnas@gmail.com",
            password: "123456"
        }

        creatUser(user).then((res) => {
            alert("user created");
            this.reloadDataUsers();
        }).catch(error => {
            console.log("Erreur lors creation user", error);
        })

    }

    supprimerUser = (userId) => {

        deleteUser(userId).then(res => {
            alert("User " + userId + " suprime");
        }).catch(error => {
            alert("erruer suppression user")
            console.log("Erreur lors supprion user", error);
        })
    }

    selectAnUser(userId) {
        getUser(userId).then(res => {
            alert("cool user getted")
            console.log("User getted", res);
        }).catch(error => {
            alert("erreur user getted")
            console.log("Erruer getting user", error);
        })
    }


    render() {
        //console.log("User in store", this.props)
        return (

            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                content={<Sidebar closeDrawer={this.closeDrawer.bind(this)} navigation={this.props.navigation} />} >
                <Container style={styles.container}>
                    <HeaderHome onPress={this.openDrawer.bind(this)} title={"Finance243"} />
                    <Content>

                        <View style={{padding : 16, flexDirection : "row", justifyContent : 'space-between', alignItems : 'center', marginTop : 10}}>
                            <Text style={{fontSize : 20, fontWeight : '700', color : '#424242'}}>Mes portefeuilles actifs</Text>
                            <Text style={{fontSize : 17, color : '#db2c6f'}}>Voir tous</Text>
                        </View>

                        <FlatList
                            style={{paddingLeft : 5}}
                            horizontal={true}
                            scrollIndicatorInsets={false}
                            data={this.state.wallets}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableHighlight>
                                        <View style={{ ...styles.card_wallet }}>
                                            <Text style={{...styles.flex1, fontSize : 16}}>{item.name}</Text>
                                            <Icon name='ios-wallet-outline' size={35} color={item.color} style={{ ...styles.flex1, marginRight : 5 }} />
                                            <Text style={{...styles.flex1, fontSize : 20, fontWeight : '700'}}>{item.amount.toFixed(2)} {item.currency}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }}
                        />


                        {/* 

                        <Button onPress={() => this.creerUser()} style={{ ...styles.button, width: "100%" }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#1c1c1c' }}>CREER USER</Text>
                        </Button>

                        <View style={{ width: '100%', padding: 10 }}>
                            {this.state.users.map(user => {
                                return (
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} key={user.id}>
                                        <Text style={{ fontWeight: "bold" }}>{user.fullname} </Text>
                                        <Text note style={{ marginTop: 5 }}>{user.email}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <Button onPress={() => this.supprimerUser(1603726771890)} style={{ ...styles.button, width: "100%" }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#1c1c1c' }}>SUUPRIMER USER</Text>
                        </Button>

                        <Button onPress={() => this.selectAnUser(1603726771890)} style={{ ...styles.button, width: "100%" }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#1c1c1c' }}>SUUPRIMER USER</Text>
                        </Button> */}
                    </Content>

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
    flex1 : {
        flex : 1
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
    },
    card_wallet: {
        backgroundColor: '#fcfcfc',
        width: 140,
        height: 150,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 2,
        justifyContent : 'center',
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

export default connect(mapStateToProps)(Home)
