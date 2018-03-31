import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    TouchableNativeFeedback

} from 'react-native';
import Slider from 'react-native-slider';

export default class Filter extends Component<Props> {

    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>

    };

    constructor(props) {
        super(props);
        this.state = {  distance: 10,
                        price : 50,
                        marginText: 20};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.cancel} source={require('../icons/pngs/cancel_icon.png')}/>

                    <Text style={styles.title}>סינון</Text>
                </View>
                <View style={styles.lineDelimiter}/>
                <TouchableNativeFeedback>
                    <View style={styles.header}>
                        <Image style={styles.arrow} source={require('../icons/pngs/next_arrow_left.png')}/>
                        <Text style={[styles.title, {position: 'absolute', right: 0, marginRight: 25}]}>מידה</Text>
                    </View>
                </TouchableNativeFeedback>
                <View style={[styles.lineDelimiter, {marginRight: 25, marginLeft: 25}]}/>
                <Text style={styles.simpleText}>מרחק</Text>
                <Text style={[styles.progressText, {marginRight: this.state.marginText}]}>{this.state.distance} קמ</Text>
                <Slider
                    value={this.state.distance}
                    minimumValue={1}
                    maximumValue={50}
                    step={1}
                    thumbTintColor={'#fff'}
                    maximumTrackTintColor={themePurple}
                    minimumTrackTintColor={themePurple}
                    style={styles.progressbar}
                    thumbStyle={styles.progressThumb}
                    trackStyle={styles.progressTrack}
                    onValueChange={(value) => this.setState({distance: value, marginText: window.width-25 - (25-(value/2) + value*(window.width-50)/50)})} />
            </View>
        )
    }

};

const window = Dimensions.get('window');
const cancelImageSize = window.width / 20;
const themePurple = '#be7ce0';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'cover',
    },
    header: {
        flex: 0.12,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontFamily: 'OpenSansHebrewCondensed-Regular',
        color: '#4a4a4a',
        margin: 10
    },
    cancel: {
        position: 'absolute',
        left: 0,
        marginLeft: 15,
        width: cancelImageSize,
        height: cancelImageSize,
    },
    arrow: {
        position: 'absolute',
        left: 0,
        marginLeft: 15,
    },
    lineDelimiter: {
        height: 1,
        backgroundColor: '#c5c2c2'
    },
    simpleText: {
        fontFamily: 'OpenSansHebrewCondensed-Regular',
        fontSize: 25,
        margin: 25,
    },
    progressbar: {
        marginRight: 25,
        marginLeft: 25,
    },
    progressThumb: {
        borderColor: themePurple,
        borderWidth: 2,
        width: 28,
        height: 28,
        borderRadius: 20
    },
    progressTrack: {
        backgroundColor: themePurple,
        height: 6,
    },
    progressText: {
        fontFamily: 'OpenSansHebrewCondensed-Regular',
        fontSize: 25,
        color: themePurple,
    }
});
