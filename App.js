/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,Alert
} from 'react-native';
import { SwitchNavigator } from "react-navigation";
require('./App/Controllers/Globals');
import { NavigationComponent } from 'react-native-material-bottom-navigation'

import FacebookLogin from "./App/Screens/FacebookLogin";
import MainScreen from "./App/Screens/MainScreen";

let refreshLocationRate = 30000;

let updateLocation = ()=>
{
    navigator.geolocation.getCurrentPosition((location) =>
    {
        global.currentLocation = {lng: location.coords.longitude, lat: location.coords.latitude}
    }, (err) =>
    {
        global.currentLocation = {};
    });
};
updateLocation();       //FIRST TIME GETTING LOCATION
setInterval(()=>{
    updateLocation();
},refreshLocationRate);

let App = SwitchNavigator({
    loginScreen: {screen: FacebookLogin},
    mainScreen: {screen: MainScreen},
    },
);

export default App;
AppRegistry.registerComponent('App', () => App);
