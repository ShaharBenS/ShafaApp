import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    PixelRatio,

} from 'react-native';
import Slider from 'react-native-slider';
import {vs, minUnit} from '../Controllers/global';

export default class Filter extends Component<Props> {

    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>

    };

    constructor(props) {
        super(props);
        this.state = {
            distance: initialDistance,
            price: initialPrice,
            marginTextDistance: Filter.calcMargin(initialDistance),
            marginTextPrice: Filter.calcMarginPrice(initialPrice)
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {/*HEAD*/}
                <View style={styles.header}>
                    <Image style={styles.cancel} source={require('../icons/pngs/cancel_icon.png')}/>
                    <Text style={styles.title}>סינון</Text>
                </View>
                <View style={styles.lineDelimiter}/>
                {/*SIZE*/}
                <TouchableNativeFeedback>
                    <View style={styles.header}>
                        <Image style={styles.arrow} source={require('../icons/pngs/next_arrow_left.png')}/>
                        <Text style={[styles.title, styles.alignRight]}>מידה</Text>
                    </View>
                </TouchableNativeFeedback>
                {/*PROGRESS BARS*/}
                <View>
                    {/*DISTANCE BAR*/}
                    <View style={[styles.lineDelimiter, styles.marginSides]}/>
                    <Text style={styles.simpleText}>מרחק</Text>
                    <Text
                        style={[styles.progressText, {marginRight: this.state.marginTextDistance}]}>{this.state.distance} ק"מ</Text>
                    <Slider
                        value={this.state.distance}
                        minimumValue={minDistance}
                        maximumValue={maxDistance}
                        step={1}
                        thumbTintColor={'#fff'}
                        maximumTrackTintColor={themePurple}
                        minimumTrackTintColor={themePurple}
                        style={styles.progressbar}
                        thumbStyle={styles.progressThumb}
                        trackStyle={styles.progressTrack}
                        onValueChange={(distance) => this.setState({
                            distance: distance,
                            marginTextDistance: Filter.calcMargin(distance)
                        })}/>
                    <View style={styles.header}>
                        <Text style={styles.quantityLeft}>{minDistance} ק"מ</Text>
                        <Text style={styles.quantityRight}>{maxDistance} ק"מ</Text>
                    </View>

                    <View style={[styles.lineDelimiter, styles.marginSides]}/>

                    {/*PRICE BAR*/}
                    <Text style={styles.simpleText}>מחיר</Text>
                    <Text
                        style={[styles.progressText, {marginLeft: this.state.marginTextPrice}]}>{this.state.price} ₪</Text>
                    <Slider
                        value={this.state.price}
                        minimumValue={minPrice}
                        maximumValue={maxPrice}
                        step={1}
                        thumbTintColor={'#fff'}
                        maximumTrackTintColor={themePurple}
                        minimumTrackTintColor={themePurple}
                        style={styles.progressbar}
                        thumbStyle={styles.progressThumb}
                        trackStyle={styles.progressTrack}
                        onValueChange={(price) => this.setState({
                            price: price,
                            marginTextPrice: Filter.calcMarginPrice(price)
                        })}/>
                    <View style={styles.header}>
                        <Text style={styles.quantityLeft}>{minPrice} ₪</Text>
                        <Text style={styles.quantityRight}>{maxPrice} ₪</Text>
                    </View>
                </View>

                <View style={[styles.lineDelimiter, styles.marginSides]}/>

                {/*SEARCH BUTTON*/}
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.smallText}>חיפוש</Text>
                </TouchableOpacity>


            </View>
        )
    }

    static calcMargin(value) {
        return window.width- 1.6*sidedMargin - value*((window.width- 2*sidedMargin)/(maxDistance));

    }

    static calcMarginPrice(value) {
        return sidedMargin + value*((window.width- 2*sidedMargin)/(maxPrice)) - (value*0.065);
    }
};

const window = Dimensions.get('window');
const barHeight = PixelRatio.getPixelSizeForLayoutSize(16.3);
const cancelImageSize = PixelRatio.getPixelSizeForLayoutSize(5);
const themePurple = '#be7ce0';
const initialDistance = 10;
const initialPrice = 50;
const minDistance = 1;
const maxDistance = 50;
const minPrice = 0;
const maxPrice = 500;
const sidedMargin = PixelRatio.getPixelSizeForLayoutSize(8);
const font = 'OpenSansHebrew-Regular';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width:PixelRatio.getPixelSizeForLayoutSize(6.5),
        height:PixelRatio.getPixelSizeForLayoutSize(6.5),
        resizeMode: 'cover',
    },
    header: {
        height: barHeight,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
        fontFamily: font,
        color: '#4a4a4a',
        margin: PixelRatio.getPixelSizeForLayoutSize(9.7)
    },
    cancel: {
        position: 'absolute',
        left: 0,
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(6),
        width: cancelImageSize,
        height: cancelImageSize,
    },
    arrow: {
        position: 'absolute',
        left: 0,
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(6),
    },
    lineDelimiter: {
        height: 1,
        backgroundColor: '#c5c2c2'
    },
    simpleText: {
        fontFamily: font,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
        marginRight: PixelRatio.getPixelSizeForLayoutSize(7.7),
        marginTop: PixelRatio.getPixelSizeForLayoutSize(7.7),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(2.7),

    },
    progressbar: {
        marginRight: sidedMargin,
        marginLeft: sidedMargin,
    },
    progressThumb: {
        borderColor: themePurple,
        borderWidth: PixelRatio.getPixelSizeForLayoutSize(0.5),
        width: PixelRatio.getPixelSizeForLayoutSize(7),
        height: PixelRatio.getPixelSizeForLayoutSize(7),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10)
    },
    progressTrack: {
        backgroundColor: themePurple,
        height: PixelRatio.getPixelSizeForLayoutSize(2),
    },
    progressText: {
        fontFamily: font,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        color: themePurple,
    },
    quantityRight: {
        fontFamily: font,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        position: 'absolute',
        right: 0,
        marginRight: PixelRatio.getPixelSizeForLayoutSize(6.7),
    },
    quantityLeft: {
        fontFamily: font,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        position: 'absolute',
        left: 0,
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(6.7),
    },
    searchButton: {
        alignSelf: 'center',
        borderColor: '#000',
        borderWidth: 2,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(25)

    },
    smallText: {
        paddingRight: PixelRatio.getPixelSizeForLayoutSize(13),
        paddingLeft: PixelRatio.getPixelSizeForLayoutSize(13),
        padding: PixelRatio.getPixelSizeForLayoutSize(2),
        fontFamily: font,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        color: '#000'
    },
    alignRight: {
        position: 'absolute',
        right: 0,
        marginRight: PixelRatio.getPixelSizeForLayoutSize(7.7)
    },
    marginSides: {
        marginRight: PixelRatio.getPixelSizeForLayoutSize(4),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(4)
    },

});
