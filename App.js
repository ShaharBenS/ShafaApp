import React,{Component} from 'react'

import {
    AppRegistry,
} from 'react-native';
import {
    SwitchNavigator
} from 'react-navigation'
import MainScreen from './App/Screens/MainScreen'
import FacebookLogin from './App/Screens/FacebookLogin'


let App = SwitchNavigator({
    loginScreen: {screen: FacebookLogin},
    mainScreen: {screen: MainScreen}},
);

export default App;
AppRegistry.registerComponent('App', () => App);
