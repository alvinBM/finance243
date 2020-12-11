/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, AsyncStorage, TextInput } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Button, Spinner, Toast, Root } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import { connect } from 'react-redux'


const { height, width } = Dimensions.get('window');

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

class Login extends Component {



    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }

        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3 - 50, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
    }


    _login() {
        //On ajoute les donnees de l'utilisateur dans le state principal (REDUX)
        let user = {
            "fullname": "Alvin bauma 2",
            "phone": "+243995502981",
            "password": "123456",
            "email": "alvinbauma@gmail.com"
        }

        if (this.state.login == '0995502981' && this.state.password == '123456') {
            const action1 = { type: "SET_USER_DATA", value: user }
            const action2 = { type: "SET_CONNECTION", value: true }
            this.props.dispatch(action1)
            this.props.dispatch(action2)
        } else {
            alert("Login incorrect")
        }


    }

    _homePage() {
        this.props.navigation.navigate('Home')
    }

    _signupPage() {
        this.props.navigation.navigate('SignUp')
    }

    render() {

        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar hidden backgroundColor="#334c66" barStyle="light-content" />

                    <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                        <Svg height={height + 50} width={width}>
                            <ClipPath id="clip">
                                <Circle r={height + 50} cx={width / 2} />
                            </ClipPath>

                            <View style={{ justifyContent: 'center', alignItems: 'center', height: height }}>
                                <Text style={{ ...styles.textBienvenue, color: 'white', fontSize: 30, fontWeight: 'bold' }}>Welcome to MoneyTrans</Text>
                            </View>

                            <Image
                                href={require('../Images/money.jpg')}
                                width={width}
                                height={height + 50}
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#clip)"
                            />
                        </Svg>
                    </Animated.View>


                    <View style={{ height: height / 3, paddingHorizontal: 20 }}>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View style={{ ...styles.button, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>SE CONNECTER</Text>
                            </Animated.View>
                        </TapGestureHandler>

                        <TapGestureHandler onHandlerStateChange={() => this._signupPage()}>
                            <Animated.View style={{ ...styles.button, backgroundColor: '#db2c6f', opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>CREER UN COMPTE</Text>
                            </Animated.View>
                        </TapGestureHandler>

                        <Animated.View style={{
                            ...StyleSheet.absoluteFill, height: height / 3, top: null, justifyContent: 'center', padding: 20,
                            zIndex: this.textInputZindex,
                            opacity: this.textInputOpacity,
                            transform: [{ translateY: this.textInputY }]
                        }}>

                            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                                <Animated.View style={styles.closeBtn}>
                                    <Animated.Text style={{ fontSize: 20, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>X</Animated.Text>
                                </Animated.View>
                            </TapGestureHandler>

                            <Item style={styles.textInput} rounded>
                                <Icon style={{ fontSize: 20 }} active name='ios-person' />
                                <Input placeholder='Téléphone' onChangeText={login => this.setState({ login })} />
                            </Item>

                            <Item style={styles.textInput} rounded>
                                <Icon style={{ fontSize: 20 }} active name='ios-lock-closed' />
                                <Input placeholder='Mot de passe' onChangeText={password => this.setState({ password })} />
                            </Item>

                            <Button onPress={() => this._login()} style={{ ...styles.button, ...styles.textInput, width: "100%" }}>
                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#1c1c1c' }}>SE CONNECTER</Text>
                            </Button>

                        </Animated.View>

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
        justifyContent: 'flex-end'
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
    closeBtn: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInput: {
        paddingHorizontal: 18,
        marginTop: 15,
        height: 50
    },
    textBienvenue: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 5,
    }

});


//connecter le state de notre application au component AddCustomer
const mapStateToProps = (state) => {
    return {
        user_data: state.account.user_data,
        user_connected: state.account.user_connected
    }
}

export default connect(mapStateToProps)(Login)