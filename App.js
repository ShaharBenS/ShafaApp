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



const App = TabNavigator(
    {
        Categories: { screen: Categories },
        ItemsGallery: { screen: ItemsGallery },
        Chats: { screen: Chats },
        Favorites: { screen: Favorites },
        Profile: {screen: Profile}
    },
    {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                labelColor: '#000000',
                rippleColor: 'purple',
                tabs: {
                    Categories: {
                        barBackgroundColor: '#FFFFFF'
                    },
                    ItemsGallery: {
                        barBackgroundColor: '#FFFFFF'
                    },
                    Chats: {
                        barBackgroundColor: '#FFFFFF'
                    },
                    Favorites: {
                        barBackgroundColor: '#FFFFFF'
                    },
                    Profile: {
                        barBackgroundColor: '#FFFFFF'
                    }
                }
            }
        }
    });

export default App;
AppRegistry.registerComponent('App', () => App);
