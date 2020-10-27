/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */


import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Header, Button, Title, Right, Body, Left, Text, Thumbnail } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'


export default class HeaderHome extends Component {

    constructor(props) {
        super(props);
    }

    handlePress = () => {
        this.props.onPress();
    }

    render() {

        return (

            <Header style={styles.header}>
                <StatusBar backgroundColor="#db2c6f" barStyle="light-content" />
                <Left>
                    <Button transparent style={{ marginRight: -10 }} onPress={this.handlePress.bind(this)}>
                        <Icon name='ios-menu' size={30} style={{ color: "#424242" }} />
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.title}>{this.props.title}</Text>
                </Body>
                <Right>
                    <Icon name='ios-person-circle' size={35} style={{ color: "#424242", marginRight : 5 }} />
                </Right>
            </Header>
        );

    }
}


const styles = StyleSheet.create({
    title: {
        color: '#424242',
        fontSize: 23,
        marginLeft: 0,
        fontWeight: 'bold'
    },
    header: {
        backgroundColor: '#fff',
    }
});
