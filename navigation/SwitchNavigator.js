import React, { Component } from 'react';
import { View, AppRegistry, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView }
  from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Signup from '../src/screens/Signup';
import Login from '../src/screens/Login';
import SplashScreen from '../src/screens/SplashScreen';
import Home from'../src/screens/Home'
import editUser from '../src/screens/editUser'
import addUser from'../src/screens/addUser'
import { decode, encode } from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const SwitchNavigator = createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    Signup: Signup,
    Login: Login,
    Home: Home,
    editUser: editUser,
    addUser: addUser
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none'
  }
)
const App = createAppContainer(SwitchNavigator);
export default App