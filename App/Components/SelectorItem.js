import React, { Component } from 'react';
import {
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export class SelectorItem extends Component<props> {

        render() {
        return (
            <TouchableOpacity style={{flex:1}} onPress={this.props.onPress}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={[styles.simpleText, {marginRight:PixelRatio.getPixelSizeForLayoutSize(5)},
                            !this.props.disableDot && {color: '#000000'} ]}>{this.props.textToDisplay}</Text>
                    <View style={[styles.selector,this.props.disableDot && {height: 0}]}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    selector: {
        width: PixelRatio.getPixelSizeForLayoutSize(4),
        height: PixelRatio.getPixelSizeForLayoutSize(4),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20),
        backgroundColor: '#be7ce0',
        alignSelf: 'center'
    },
    simpleText: {
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
    },

});


