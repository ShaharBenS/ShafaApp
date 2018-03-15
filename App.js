/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions

} from 'react-native';
import {CategoryItem} from './App/Components/CategoryItem';

export default class App extends Component<Props> {
    render() {
        let pic = require('./App/Images/placeholder.jpg');
        return (
                <ScrollView contentContainerStyle={{ height:2000}} >
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                    <CategoryItem categoryImagePath={pic} categoryName="T-Shirts"/>
                </ScrollView>
        );
    }
};


    const styles = StyleSheet.create({
        container: {
        flex: 1,

        },

    });