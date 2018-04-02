import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    PixelRatio,
} from 'react-native';

export class ChecklistItem extends Component<props> {

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={{flex: 1}} onPress={this.props.onPress}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginLeft: PixelRatio.getPixelSizeForLayoutSize(7),
                                                        marginRight: PixelRatio.getPixelSizeForLayoutSize(7)}}>
                        <Image source={require('../icons/pngs/checkedIcon.png')}
                               style={[styles.selector, !this.props.checked && {height: 0}]}/>
                        <Text
                            style={[styles.simpleText, this.props.checked && {color: '#000000'}]}>{this.props.textToDisplay}</Text>
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
        height: PixelRatio.getPixelSizeForLayoutSize(16),

    },
    selector: {
        width: PixelRatio.getPixelSizeForLayoutSize(4.7),
        height: PixelRatio.getPixelSizeForLayoutSize(5.7),
        position: 'absolute',
        left: 0,
        alignSelf: 'center'
    },
    simpleText: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
    },
    lineDelimiter: {
        height: PixelRatio.getPixelSizeForLayoutSize(0.5),
        backgroundColor: '#c5c2c2',
        marginRight: PixelRatio.getPixelSizeForLayoutSize(7),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(7),
    },

});


