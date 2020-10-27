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
                    <Button transparent style={{ marginRight: -13 }} onPress={this.handlePress.bind(this)}>
                        <Icon name='ios-menu' size={30} style={{ color: "#db2c6f" }} />
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.title}>{this.props.title}</Text>
                </Body>
                <Right>
                    <Icon name='ios-person-circle' size={40} style={{ color: "#db2c6f" }} />
                </Right>
            </Header>
        );

    }
}


const styles = StyleSheet.create({
    title: {
        color: '#db2c6f',
        fontSize: 23,
        marginLeft: 0,
        fontWeight: 'bold'
    },
    header: {
        backgroundColor: '#fff',
    }
});
