/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import { SwitchNavigator } from "react-navigation";
require('./App/Controllers/Globals');
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import {SwitchNavigator} from "react-navigation";
import FacebookLogin from "./App/Screens/FacebookLogin";
import MainScreen from "./App/Screens/MainScreen";


let App = SwitchNavigator({
    mainScreen: {screen: MainScreen},
    loginScreen: {screen: FacebookLogin}
    },
);

export default App;
AppRegistry.registerComponent('App', () => App);
