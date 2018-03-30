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
import FacebookLogin from "./App/Screens/FacebookLogin";
import MainScreen from "./App/Screens/MainScreen";

import AddItem from "./App/Screens/AddItem"

let App = SwitchNavigator({
    loginScreen: {screen: FacebookLogin},
    mainScreen: {screen: MainScreen}},
);

App = AddItem;

export default App;
AppRegistry.registerComponent('App', () => App);
