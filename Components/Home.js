/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, AsyncStorage, FlatList } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root, Button, List, ListItem, Left, Body, Right } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import realm, { creatUser, updateUser, deleteUser, getUser, getUsers } from "../databases/schemas"


class Home extends Component {



    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.reloadDataUsers();
    }

    reloadDataUsers = () => {
        getUsers().then((users) => {
            console.log("Users getted", users);
            this.setState({ users });
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
            <Root>
                <Container style={styles.container}>
                    <StatusBar backgroundColor="#334c66" barStyle="light-content" />
                    <Content>
                        <Text>Liste des utilisateurs</Text>

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
                        </Button>
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

});

//connecter le state de notre application au component AddCustomer
const mapStateToProps = (state) => {
    return {
        user_data: state.account.user_data,
        user_connected: state.account.user_connected
    }
}

export default connect(mapStateToProps)(Home)
