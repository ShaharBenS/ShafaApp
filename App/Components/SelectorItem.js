import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {vs} from '../Controllers/global';

export class SelectorItem extends Component<props> {

        render() {
        return (
            <TouchableOpacity style={{flex:1}} onPress={this.props.onPress}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={[styles.simpleText, {marginRight: vs(6)}, !this.props.disableDot && {color: '#000000'} ]}>{this.props.textToDisplay}</Text>
                    <View style={[styles.selector,this.props.disableDot && {height: 0}]}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    selector: {
        width: vs(8),
        height: vs(8),
        borderRadius: vs(16),
        backgroundColor: '#be7ce0',
        alignSelf: 'center'
    },
    simpleText: {
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: vs(12),
    },

});


