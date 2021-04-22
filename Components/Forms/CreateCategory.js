/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, AsyncStorage, Image } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root, Button, List, ListItem, Left, Body, Right } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { TouchableHighlight } from 'react-native-gesture-handler';


class CreateCategory extends Component {



    constructor(props) {
        super(props)
        this.state = {
            users: [],
            payment : 1,
        }
    }

    componentDidMount() {
        //this.reloadDataUsers();
    }

    _paymentMode(){
        if(this.state.payment == 1){
            return(
                <Image
                    style={{ height : 80, width : 150}}
                    source={require('../../Images/paymentMode/airtel-money.jpg')}
                />
            )
        }

        if(this.state.payment == 2){
            return(
                <Image
                    style={{ height : 80, width : 150}}
                    source={require('../../Images/paymentMode/orange-money.jpg')}
                />
            )
        }

        if(this.state.payment == 3){
            return(
                <Image
                    style={{ height : 80, width : 150}}
                    source={require('../../Images/paymentMode/m-pesa.jpg')}
                />
            )
        }

        if(this.state.payment == 4){
            return(
                <Image
                    style={{ height : 80, width : 150}}
                    source={require('../../Images/paymentMode/carte-bancaire.jpg')}
                />
            )
        }
    }

    _changePaymentMode(mode){
        this.setState({
            payment : mode
        })
    }

    _rechargeAccount(){
        Toast.show({
            text: 'Votre recharge a été enregistré avec succès, Vous allez recevoir une notification de votre opérateur pour confirmer',
            buttonText: 'Fermer',
            duration: 4000,
            type: "success"
        })
    }


    render() {
        //console.log("User in store", this.props)
        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar backgroundColor="#db2c6f" barStyle="light-content" />
                    
                    <View style={{flexDirection : 'column', flex: 1}}>
                        <View style={{flex : 1, backgroundColor : "#f1f1f1", justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={{padding : 20, fontSize : 20, marginTop : -20}}>Choose your mobile money</Text>

                            <View style={{flexDirection : 'row'}}>
                                    
                                    <TouchableHighlight onPress={() => this._changePaymentMode(1)}>
                                        <Image
                                            style={{ height : 80, width : 150}}
                                            source={require('../../Images/paymentMode/airtel-money.jpg')}
                                        />
                                    </TouchableHighlight>
                                    
                                    <View style={{width : 20}}></View>
                                    <TouchableHighlight onPress={() => this._changePaymentMode(2)}>
                                        <Image
                                            onPress={() => this._changePaymentMode(2)}
                                            style={{ height : 80, width : 150}}
                                            source={require('../../Images/paymentMode/orange-money.jpg')}
                                        />
                                    </TouchableHighlight>
                            </View>

                            <View style={{flexDirection : 'row', marginTop : 10}}>
                                <TouchableHighlight onPress={() => this._changePaymentMode(3)}>
                                    <Image
                                        onPress={() => this._changePaymentMode(3)}
                                        style={{ height : 80, width : 150}}
                                        source={require('../../Images/paymentMode/m-pesa.jpg')}
                                    />
                                </TouchableHighlight>
                                
                                <View style={{width : 20}}></View>
                                <TouchableHighlight onPress={() => this._changePaymentMode(4)}>
                                    <Image
                                        onPress={() => this._changePaymentMode(4)}
                                        style={{ height : 80, width : 150}}
                                        source={require('../../Images/paymentMode/carte-bancaire.jpg')}
                                    />
                                </TouchableHighlight>
                            </View>

                        </View>

                        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', padding : 20}}>
                            
                            {this._paymentMode()}
                            
                            
                            <Item style={styles.textInput} rounded>
                                <Icon style={{ fontSize: 20 }} active name='ios-person' />
                                <Input keyboardType='phone-pad' placeholder='Enter your phone number' onChangeText={login => this.setState({ login })} />
                            </Item>

                            <Item style={styles.textInput} rounded>
                                <Icon style={{ fontSize: 20 }} active name='ios-cash' />
                                <Input keyboardType='numeric' placeholder='Enter the amount' onChangeText={login => this.setState({ login })} />
                            </Item>

                            <Button onPress={() => this._rechargeAccount()} style={{ ...styles.button, ...styles.textInput, width: "100%" }}>
                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#1c1c1c' }}>Recharge my account</Text>
                            </Button>
                        </View>
                    </View>

                </Container>
            </Root>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    textInput: {
        paddingHorizontal: 18,
        marginTop: 15,
        height: 50
    },
    button: {
        backgroundColor: '#f3f3f3',
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

export default connect(mapStateToProps)(CreateCategory)
