import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,

} from 'react-native';
import Slider from 'react-native-slider';
import {vs} from '../Controllers/global';

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
                    <Text style={[styles.simpleText, styles.marginBottom5]}>מרחק</Text>
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
                    <View style={[styles.header, styles.marginBottom5]}>
                        <Text style={styles.quantityLeft}>{minDistance} ק"מ</Text>
                        <Text style={styles.quantityRight}>{maxDistance} ק"מ</Text>
                    </View>

                    <View style={[styles.lineDelimiter, styles.marginSides]}/>

                    {/*PRICE BAR*/}
                    <Text style={[styles.simpleText, styles.marginBottom5]}>מחיר</Text>
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
                    <View style={[styles.header, styles.marginBottom5]}>
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
        return window.width - vs(22) - (vs(14) - (value / 2) + value * (window.width - vs(27)) / vs(27));
    }

    static calcMarginPrice(value) {
        return (vs(11) - (value / 2) + value * (window.width - vs(27)) / vs(174));
    }
};

const window = Dimensions.get('window');
const barHeight = window.height / 12;
const bottomViewHeight = window.height / 3;
const cancelImageSize = window.width / 20;
const themePurple = '#be7ce0';
const initialDistance = 10;
const initialPrice = 50;
const minDistance = 1;
const maxDistance = 50;
const minPrice = 0;
const maxPrice = 500;
const font = 'OpenSansHebrew-Regular';



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width:vs(13),
        height:vs(13),
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
        fontSize: vs(14),
        fontFamily: font,
        color: '#4a4a4a',
        margin: vs(6)
    },
    cancel: {
        position: 'absolute',
        left: 0,
        marginLeft: vs(8),
        width: cancelImageSize,
        height: cancelImageSize,
    },
    arrow: {
        position: 'absolute',
        left: 0,
        marginLeft: vs(8),
    },
    lineDelimiter: {
        height: vs(1),
        backgroundColor: '#c5c2c2'
    },
    simpleText: {
        fontFamily: font,
        fontSize: vs(13),
        margin: vs(13),
    },
    progressbar: {
        marginRight: vs(13),
        marginLeft: vs(13),
    },
    progressThumb: {
        borderColor: themePurple,
        borderWidth: vs(2),
        width: vs(15),
        height: vs(15),
        borderRadius: vs(11)
    },
    progressTrack: {
        backgroundColor: themePurple,
        height: vs(3),
    },
    progressText: {
        fontFamily: font,
        fontSize: vs(13),
        color: themePurple,
    },
    quantityRight: {
        fontFamily: font,
        fontSize: vs(11),
        position: 'absolute',
        right: 0,
        marginRight: vs(13),
    },
    quantityLeft: {
        fontFamily: font,
        fontSize: vs(11),
        position: 'absolute',
        left: 0,
        marginLeft: vs(13),
    },
    searchButton: {
        alignSelf: 'center',
        borderColor: '#000',
        borderWidth: vs(2),
        marginTop: vs(16)

    },
    smallText: {
        paddingRight: vs(22),
        paddingLeft: vs(22),
        padding: vs(3),
        fontFamily: font,
        fontSize: vs(11),
        color: '#000'
    },
    alignRight: {
        position: 'absolute',
        right: 0,
        marginRight: vs(13)
    },
    marginSides: {
        marginRight: vs(13),
        marginLeft: vs(13)
    },
    marginBottom5: {marginBottom: vs(3)}

});
