/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,

} from 'react-native';
import {CategoryItem} from './App/Components/CategoryItem';

export default class App extends Component<Props> {


    render() {
        let pic = require('./App/Images/placeholder.jpg');
        let name = "Category i"
        let data=[{pict:pic,namet:name, id:'0'},
            {pict:pic,namet:name, id:'1'},
            {pict:pic,namet:name, id:'2'},
            {pict:pic,namet:name, id:'3'},
            {pict:pic,namet:name, id:'4'},
            {pict:pic,namet:name, id:'5'},
            {pict:pic,namet:name, id:'6'},
            {pict:pic,namet:name, id:'7'},];
        return (
            <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item})=><CategoryItem categoryImagePath={item.pict} categoryName={item.namet}/>}
                keyExtractor={item => item.id}
            />
            </View>
        );
    }
};


    const styles = StyleSheet.create({
        container: {
        flex: 1,
        },

    });