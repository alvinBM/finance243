import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MainNav from './Navigations/MainNav';

export default class App extends Component{

  render() {
    return (
      <MainNav />
    );
  }
}
