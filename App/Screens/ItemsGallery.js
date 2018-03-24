/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,

} from 'react-native';
import {GalleyItem} from '../Components/GalleyItem';

export default class ItemsGallery extends Component<Props> {

    static navigationOptions = {
        labelStyle: { display: 'none'},
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>
    };

    render() {
        let pic = 1;
        let name = pic;
        let data=[{id:'1'},{id:'2'},{id:'3'},{id:'4'},{id:'5'},{id:'6'}];

        return (

            <View style={styles.container}>
                <FlatList
                    numColumns={2}
                    data={data}
                    renderItem={({item})=><GalleyItem/> }
                    keyExtractor={item => item.id}

                />

            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },

});