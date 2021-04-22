/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import React, {Component} from 'react';
import {StyleSheet, View, Linking, ImageBackground, TouchableHighlight} from 'react-native';
import { Container, Text, Content, Button, ListItem, Left, Body, Right, Switch, Separator} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler';


class Sidebar extends Component {


    constructor(props) {
        super(props)
    }

    // handlePress = () => {
    //     // Need to check to prevent null exception. 
    //     this.props.closeDrawer(); // Same as this.props.onPress && this.props.onPress();
    // }

    
    _logout = () => {
        //Remove session user
        
    }
    

    render() {

        return (
                <Container style={styles.container} >
                    <ImageBackground style={styles.header_content} source={require('../../Images/bcheader.jpg')}>
                        
                            <TouchableHighlight>
                                <View style={styles.header_content}>
                                    <Icon name='ios-person-circle' style={{fontSize : 70, color : '#FFF'}} />
                                    <Text style={{color : '#FFF', fontSize : 17}}>ALvin BAUMA</Text>
                                    <Text style={{color : '#FFF', fontSize : 14, fontWeight : "bold"}}>Mes compte : 3000$ et 234000fr</Text>
                                </View>
                            </TouchableHighlight>
                        
                    </ImageBackground>

                    <View style={styles.form_content}>
                        <Content style={{width : '100%', padding : 0, marginTop : 10}}>

                            <Text style={{color : "#6b6b6b", padding : 15}}>Something here</Text>

                        </Content>
                    </View>
                </Container>
        );
    }
}


const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding : 0,
        width : '100%'
  },
  header_content : {
        flex : 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        height: '100%'
    
  },
  form_content : {
        flex : 8,
        backgroundColor: '#FFFFFF',
        width : '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding : 0
  },
  item_input:{
        borderRadius : 30, 
        backgroundColor : '#efefef', 
        marginTop : 20,
        paddingLeft : 15,
        fontSize : 11
  },
  item_menu : {
        color : "#595959",
        fontSize : 15
  }
});


//connecter le state de notre application au component AddCustomer
const mapStateToProps = (state) => {
    return {
        user_data : state.account.user_data
    }
}

export default connect(mapStateToProps)(Sidebar)