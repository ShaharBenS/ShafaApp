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
import {CategoryItem} from '../Components/CategoryItem';

export default class Categories extends Component<Props> {

    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={{width:24, height:24, resizeMode:'cover'}}/>

    };

    render() {

        let data=[  {pict:require('../Images/categories/trousers_img.png'),namet:"מכנסיים ואוברולים", id:'0'},
                    {pict:require('../Images/categories/swimsuit_img.png'),namet:"בגדי ים", id:'1'},
                    {pict:require('../Images/categories/shirt_img.png'),namet:"חולצות", id:'2'},
                    {pict:require('../Images/categories/night_img.png'),namet:"בגדי ערב", id:'3'},
                    {pict:require('../Images/categories/skirt_img.png'),namet:"חצאיות", id:'4'},
                    {pict:require('../Images/categories/jacket_img.png'),namet:"מעילים וג'קטים", id:'5'},
                    {pict:require('../Images/categories/sweater_icon.png'),namet:"סוודרים", id:'6'},
                    {pict:require('../Images/categories/shoes_img.png'),namet:"נעליים", id:'7'},
                    {pict:require('../Images/categories/dress_img.png'),namet:"שמלות", id:'8'},
                    {pict:require('../Images/categories/accessories_img.png'),namet:"אקססוריז", id:'9'},
                    {pict:require('../Images/categories/trousers_img.png'),namet:"הכל", id:'10'},];
        return (
            <View style={styles.container}>

                <FlatList
                    data={data}
                    renderItem={({item})=><CategoryItem categoryImagePath={item.pict} categoryName={item.namet}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<Image source={require('../Images/categories/shafa_wide_logo.png')} style={styles.logo}/>}
                />
            </View>
        );
    }
};


const percent = 0.1;
const window = Dimensions.get('window');
const renderedHeight = percent*window.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    logo : {
        resizeMode:'cover',
        margin: 15,
        alignSelf:'center'

    },
    icon: {
        width:24,
        height:24,
        resizeMode:'cover',
    },
});