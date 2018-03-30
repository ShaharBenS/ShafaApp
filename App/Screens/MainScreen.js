import React, {Component} from 'react';

import {NavigationComponent} from 'react-native-material-bottom-navigation'
import {TabNavigator} from "react-navigation";

import Categories from "./Categories";
import Favorites from "./Favorites";
import Chats from "./Chats";
import Profile from "./Profile";
import ItemsGallery from "./ItemsGallery";


const mainView = TabNavigator(
    {
        Categories: {screen: Categories},
        ItemsGallery: {screen: ItemsGallery},
        Chats: {screen: Chats},
        Favorites: {screen: Favorites},
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


export default mainView;