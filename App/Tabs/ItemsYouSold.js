import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,
    Text,
    PixelRatio, Alert,

} from 'react-native';
import {TabSellItem} from "../Components/TabSellItem";

const settingsIcon = require('../icons/pngs/settings_icon.png');

export class ItemsYouSold extends Component<Props> {



    render() {
        let data = [{id: 1}];
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={(item) =>
                    {
                        return <TabSellItem/>
                    }}
                    keyExtractor={(item) =>
                    {
                        return item.id;
                    }}
                />

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
