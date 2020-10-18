
import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Modal, AsyncStorage} from 'react-native';
import { Container, Text, Content, Form, Item, Input, Button, Spinner, Toast, Root} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'


export default class Login extends Component {


    
    constructor(props) {
        super(props)
        this.state = {
          login : '',
          password : '',
          error : false,
          messageError : "",
          modalVisible: false,
          showToast: false
        }

    }

    _login = () => {

        alert("login");
        console.log("login")
    }


    render() {

        return (
            <Root>
                <Container style={styles.container}>
                    <StatusBar backgroundColor="#334c66" barStyle="light-content" />


                    <Modal
                        style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}} >
                            
                                <Spinner color='green' size ={60} />
                                <Text style={{textAlign : 'center'}}>Connexion en cours...</Text>
                                
                        </View>
                    </Modal>


                    <View style={styles.header_content}>
                        <Icon name='ios-person' style={{fontSize : 70, color : '#FFF'}} />
                        <Text style={{color : '#FFF', fontSize : 20}}>Connectez-vous</Text>
                    </View>

                    <View style={styles.form_content}>
                        
                        <Content style={{width : '90%', marginTop : 20}}>
                            <Form>
                                <Item regular style={styles.item_input}>
                                    <Icon active name='ios-person' style={{fontSize : 20}} />
                                    <Input placeholder="Votre login" onChangeText={login => this.setState({login})} />
                                </Item>
                                <Item regular style={styles.item_input}>
                                    <Icon active name='ios-lock-closed' style={{fontSize : 20}} />
                                    <Input placeholder="Votre mot de passe" secureTextEntry={true} onChangeText={password => this.setState({password})} />
                                </Item>
                                <Button rounded info block style={{marginTop : 20, backgroundColor : "#309c5f"}}  onPress={() => this._login()} >
                                    <Icon name='ios-lock-closed' style={{fontSize : 20, color : "#ffffff"}} />
                                    <Text uppercase={false} style={{fontSize : 16}}>Se connecter</Text>
                                </Button>
                            </Form>


                        </Content>
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
  header_content : {
        flex : 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#263a5c',
    
  },
  form_content : {
        flex : 8,
        backgroundColor: '#FFFFFF',
        width : '100%',
        justifyContent: 'center',
        alignItems: 'center',
  },
  item_input:{
    borderRadius : 4, 
    backgroundColor : '#efefef', 
    marginTop : 20,
    paddingLeft : 15,
    fontSize : 11
  }
});
