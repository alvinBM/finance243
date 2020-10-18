
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Modal, AsyncStorage, Button } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Spinner, Toast, Root } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'


class Home extends Component {



    constructor(props) {
        super(props)
        this.state = {
            login: ''
        }

    }


    render() {
        console.log("User in store", this.props)
        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar backgroundColor="#334c66" barStyle="light-content" />

                    <View>
                        <Text>Salut le monde home page</Text>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
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
