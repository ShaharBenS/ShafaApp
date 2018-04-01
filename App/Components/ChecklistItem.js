import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {vs, minUnit} from '../Controllers/global';

export class ChecklistItem extends Component<props> {

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={{flex: 1}} onPress={this.props.onPress}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginLeft: vs(15), marginRight: vs(15)}}>
                        <Image source={require('../icons/pngs/checkedIcon.png')}
                               style={[styles.selector, !this.props.checked && {height: 0}]}/>
                        <Text
                            style={[styles.simpleText, {marginRight: vs(6)}, this.props.checked && {color: '#000000'}]}>{this.props.textToDisplay}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.lineDelimiter}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: vs(30),

    },
    selector: {
        width: vs(8),
        height: vs(8),
        position: 'absolute',
        left: 0,
        alignSelf: 'center'
    },
    simpleText: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: vs(12),
    },
    lineDelimiter: {
        height: vs(1),
        backgroundColor: '#c5c2c2',
        marginRight: vs(15),
        marginLeft: vs(15),
    },

});


