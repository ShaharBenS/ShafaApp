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
    Text,
    Dimensions,
    TouchableOpacity

} from 'react-native';
import {GalleyItem} from '../Components/GalleyItem';

export default class ItemsGallery extends Component<Props> {

    static navigationOptions = {
        labelStyle: { display: 'none'},
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>
    };

    render() {

        let data=[{id:'1'},{id:'2'},{id:'3'},{id:'4'},{id:'5'},{id:'6'}];

        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.categoryName}>CATEGORY NAME</Text>
                    <Image style={styles.backArrow} source={require('../icons/pngs/next_arrow.png')}/>
                </View>
                <View style={styles.lineDelimiter}/>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.simpleView}>
                        <Text style={styles.simpleText}>מיון</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.simpleView}>
                        <Text style={styles.simpleText}>סינון</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lineDelimiter}/>

                <FlatList
                    style={{marginTop:-0}}
                    numColumns={2}
                    data={data}
                    renderItem={({item})=><GalleyItem/> }
                    keyExtractor={item => item.id}

                />

            </View>
        );
    }
};

const percentHeight = 0.1;
const window = Dimensions.get('window');
const renderedHeight = percentHeight*window.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width:24,
        height:24,
        resizeMode:'cover',
    },
    header: {
        flex: 0.12,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontSize:25,
        fontFamily: 'OpenSansHebrewCondensed-Regular',
        color: '#4a4a4a',
        margin: 10
    },
    backArrow: {
        position: 'absolute',
        right: 0,
        marginRight: 15,
    },
    lineDelimiter: {
        height: 1,
        backgroundColor: '#c5c2c2'
    },
    options: {
        flex:0.1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    simpleView: {flex:1,},
    simpleText: {
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrewCondensed-Regular',
        fontSize:20,
    }


});