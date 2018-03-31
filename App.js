/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Image,Alert,Text
} from 'react-native';
import { SwitchNavigator } from "react-navigation";
import FacebookLogin from "./App/Screens/FacebookLogin";
import MainScreen from "./App/Screens/MainScreen";
require('./App/Controllers/Globals');


let App = SwitchNavigator({
    loginScreen: {screen: FacebookLogin},
    mainScreen: {screen: MainScreen}},
);

export default App;
AppRegistry.registerComponent('App', () => App);
