import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,
    Text

} from 'react-native';

export default class Favorites extends Component<Props> {

    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>

    };

    render() {
        return (
            <View>
                <Text>Movies & TV</Text>
            </View>
        )
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    icon: {
        width:24,
        height:24,
        resizeMode:'cover',


    },
});
