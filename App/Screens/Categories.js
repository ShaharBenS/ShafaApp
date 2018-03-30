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


let data;

export default class Categories extends Component<Props> {
    constructor(props){
        super(props);
        data = [  {pict:require('../Images/categories/trousers_img.png')},
            {pict:require('../Images/categories/swimsuit_img.png')},
            {pict:require('../Images/categories/shirt_img.png')},
            {pict:require('../Images/categories/night_img.png')},
            {pict:require('../Images/categories/skirt_img.png')},
            {pict:require('../Images/categories/jacket_img.png')},
            {pict:require('../Images/categories/sweater_icon.png')},
            {pict:require('../Images/categories/shoes_img.png')},
            {pict:require('../Images/categories/dress_img.png')},
            {pict:require('../Images/categories/accessories_img.png')},
            {pict:require('../Images/categories/trousers_img.png')}]
            .map((item,index)=>{return {pict:item.pict,namet:global.categories[index].namet,
            id:global.categories[index].id}});
    }

    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={{width:24, height:24, resizeMode:'cover'}}/>

    };

    render() {

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