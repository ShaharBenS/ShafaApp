/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import { TabNavigator } from "react-navigation";
import Categories from "./App/Screens/Categories";
import Favorites from "./App/Screens/Favorites";
import Chats from "./App/Screens/Chats";
import Profile from "./App/Screens/Profile";
import ItemsGallery from "./App/Screens/ItemsGallery";


let App = SwitchNavigator({
    loginScreen: {screen: FacebookLogin},
    mainScreen: {screen: MainScreen}},
);

export default App;
AppRegistry.registerComponent('App', () => App);
