
import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Dimensions, AsyncStorage, TextInput } from 'react-native';
import { Container, Text, Content, Form, Item, Input, Button, Spinner, Toast, Root } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';

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

export default class Login extends Component {



    constructor(props) {
        super(props)
        this.state = {
            login: '',
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
            outputRange: [-height / 3 -50, 0],
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

    render() {

        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar hidden backgroundColor="#334c66" barStyle="light-content" />

                    <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                        <Svg height={height + 50} width={width}>
                            <ClipPath id="clip">
                                <Circle r={height+50} cx={width / 2} />
                            </ClipPath>

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

                        <TapGestureHandler>
                            <Animated.View style={{ ...styles.button, backgroundColor: '#db2c6f', opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>ACCEDER AU FORUM</Text>
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
                                <Input placeholder='Téléphone' />
                            </Item>

                            <Item style={styles.textInput} rounded>
                                <Icon style={{ fontSize: 20 }} active name='ios-lock-closed' />
                                <Input placeholder='Mot de passe' />
                            </Item>

                            <Animated.View style={{ ...styles.button, ...styles.textInput }}>
                                <Text style={{ fontSize: 15, fontWeight: '500', color: '#1c1c1c' }}>SE CONNECTER</Text>
                            </Animated.View>

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
    }

});
