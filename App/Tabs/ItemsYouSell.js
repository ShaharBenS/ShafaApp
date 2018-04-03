import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,
    Text,
    PixelRatio,

} from 'react-native';

const settingsIcon = require('../icons/pngs/settings_icon.png');

export class ItemsYouSell extends Component<Props> {

    constructor(props){
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    icon: {
        width: PixelRatio.getPixelSizeForLayoutSize(6.5),
        height: PixelRatio.getPixelSizeForLayoutSize(6.5),
        resizeMode: 'cover',
    },


});
