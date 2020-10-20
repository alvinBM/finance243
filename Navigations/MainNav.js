/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// Navigations/MainNav.js
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import Home from '../Components/Home';
import CreateWallet from '../Components/Forms/CreateWallet';
import CreateCategory from '../Components/Forms/CreateCategory';
import Create from '../Components/Create';
import Forum from '../Components/Forum';

const Stack = createStackNavigator();
const CreateStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const CreateStackScreen = () => {
  return (
    <CreateStack.Navigator>
      <CreateStack.Screen name="Create" component={Create} />
      <CreateStack.Screen name="createWallet" component={CreateWallet} />
      <CreateStack.Screen name="createCategory" component={CreateCategory} />
    </CreateStack.Navigator>
  )
}


function MainNav(params) {
  console.log("User connected from menu", params.userConnected);
  return (
    <NavigationContainer>
      {params.userConnected ? (
        <>
          <Tabs.Navigator
            initialRouteName="Dashboard"
            tabBarOptions={{
              activeTintColor: '#e91e63',
              inactiveTintColor: 'gray',
              style: {
                backgroundColor: 'white',
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 2 },
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 10,
              },
            }}

          >
            <Tabs.Screen name="Dashboard" component={Home}
              options={{
                tabBarLabel: 'Tableau de bord',
                tabBarIcon: ({ color }) => (
                  <Icon name="ios-home" color={color} size={25} />
                ),
              }}
            />

            <Tabs.Screen name="CreateStackScreen" component={CreateStackScreen}
              options={{
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                  <Icon name="ios-add-circle" color={color} size={70} style={{ marginTop: 0 }} />
                ),
              }}
            />

            <Tabs.Screen name="Forum" component={Forum}
              options={{
                tabBarLabel: 'Forum',
                tabBarIcon: ({ color }) => (
                  <Icon name="ios-newspaper" color={color} size={25} />
                ),
              }}
            />
          </Tabs.Navigator>
        </>
      ) : (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

export default MainNav;
