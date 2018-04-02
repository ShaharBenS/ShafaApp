/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions, PixelRatio,

} from 'react-native';
import {CategoryItem} from '../Components/CategoryItem';


let data;
let navigateToItems;

export default class Categories extends Component<Props>
{
    constructor(props)
    {
        super(props);

        data = [{pict: require('../Images/categories/trousers_img.png')},
            {pict: require('../Images/categories/swimsuit_img.png')},
            {pict: require('../Images/categories/shirt_img.png')},
            {pict: require('../Images/categories/night_img.png')},
            {pict: require('../Images/categories/skirt_img.png')},
            {pict: require('../Images/categories/jacket_img.png')},
            {pict: require('../Images/categories/sweater_icon.png')},
            {pict: require('../Images/categories/shoes_img.png')},
            {pict: require('../Images/categories/dress_img.png')},
            {pict: require('../Images/categories/accessories_img.png')},
            {pict: require('../Images/categories/trousers_img.png')}]
            .map((item, index) =>
            {
                return {
                    pict: item.pict, namet: global.categories[index].namet,
                    id: global.categories[index].id
                }
            });
        const {navigate} = this.props.navigation;



        navigateToItems = (category)=>
    {
        global.currentCategoryID = category.id;
        navigate('ItemsGallery')
    };
    }

    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>

    };

    render() {

        return (
            <View style={styles.container}>

                <FlatList
                    data={data}
                    renderItem={({item}) =>
                        <CategoryItem categoryImagePath={item.pict} categoryName={item.namet}
                                      onPressCallback={()=>{navigateToItems(item)}}/>}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<Image source={require('../Images/categories/shafa_wide_logo.png')}
                                                style={styles.logo}/>}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    logo : {
        resizeMode:'cover',
        margin: PixelRatio.getPixelSizeForLayoutSize(5),
        alignSelf:'center'

    },
    icon: {
        width:PixelRatio.getPixelSizeForLayoutSize(6.5),
        height:PixelRatio.getPixelSizeForLayoutSize(6.5),
        resizeMode:'cover',
    },
});