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

import FacebookLogin from "./App/Screens/FacebookLogin";
import MainScreen from "./App/Screens/MainScreen";
import ItemPage from "./App/Screens/ItemPage";

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
App = ItemPage;

export default App;
AppRegistry.registerComponent('App', () => App);
