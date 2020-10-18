
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, AsyncStorage, Button } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'


export default class Login extends Component {



    constructor(props) {
        super(props)
        this.state = {
            login: ''
        }

    }


    render() {

        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar backgroundColor="#334c66" barStyle="light-content" />

                    <View>
                        <Text>Salut le monde</Text>
                        <Button
                            title="Go to Details"
                            onPress={() => this.props.navigation.navigate('Login')}
                        />
                    </View>
                </Container>
            </Root>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#263a5c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_content: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#263a5c',

    },
    form_content: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_input: {
        borderRadius: 4,
        backgroundColor: '#efefef',
        marginTop: 20,
        paddingLeft: 15,
        fontSize: 11
    }
});
