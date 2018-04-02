import React, {Component} from 'react';

import {TabNavigator} from "react-navigation";

import Categories from "./Categories";
import Favorites from "./Favorites";
import Chats from "./Chats";
import Profile from "./Profile";
import ItemsGallery from "./ItemsGallery";
import AddItem from './AddItem'
import Filter from "./Filter";
import SelectMeasure from "./SelectMeasure";


const mainView = TabNavigator(
    {
        //Filter: {screen: Filter},
        Categories: {screen: Categories},
        AddItem: {screen: AddItem},
        //SelectMeasure: {screen: SelectMeasure},
        ItemsGallery: {screen: ItemsGallery},
        //Chats: {screen: Chats},
        //Favorites: {screen: Favorites},
        Profile: {screen: Profile}
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                labelColor: '#000000',
                rippleColor: 'purple',
                tabs: {
                    Filter: {
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