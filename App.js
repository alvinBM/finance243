import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MainNav from './Navigations/MainNav';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

export default class App extends Component {

  render() {
    return (
      <Provider store={Store}>
        <MainNav />
      </Provider>
    );
  }
}
