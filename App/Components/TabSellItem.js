import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Alert,
    PixelRatio,
    TouchableNativeFeedback,

} from 'react-native';

let distanceController = require('../Controllers/DistanceController');
let likesController = require('../Controllers/LikesController');

export class TabSellItem extends Component<props> {
    render() {

        return (
            <View>
                <View style={styles.container}>
                    {/*3 Dots*/}
                    <TouchableOpacity style={styles.clickableDots}>
                        <View style={styles.dots}>
                            <View style={styles.singleDot}/>
                            <View style={styles.singleDot}/>
                            <View style={styles.singleDot}/>
                        </View>
                    </TouchableOpacity>

                    {/* INFO */}
                    <View style={styles.info}>
                        <Text numberOfLines={1} style={styles.itemName}>THIS GONNA BE THE NAME</Text>
                        <View style={styles.rowItems}>
                            <Text style={styles.simpleText} numberOfLines={1}>מידה S</Text>
                            <Text style={styles.simpleText} numberOfLines={1}> • </Text>
                            <Text style={styles.simpleText} numberOfLines={1}>120 שח</Text>

                        </View>

                        <View style={styles.rowItems}>
                            <Text style={[styles.simpleText,{textAlign: 'center'}]} numberOfLines={1}>28</Text>
                            <Image style={styles.likeImage} source={require('../icons/pngs/like_icon.png')}/>
                        </View>

                    </View>
                    {/* IMAGE */}
                    <Image style={styles.image} source={require('../Images/placeholder.jpg')}/>
                </View>
                <View style={styles.lineDelimiter}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: PixelRatio.getPixelSizeForLayoutSize(45),
        width: '100%',
        margin: PixelRatio.getPixelSizeForLayoutSize(4),
        justifyContent: 'flex-end'
    },
    dots: {
        flexDirection: 'column',
    },
    singleDot: {
        backgroundColor: '#000',
        width: PixelRatio.getPixelSizeForLayoutSize(2),
        height: PixelRatio.getPixelSizeForLayoutSize(2),
        marginTop: PixelRatio.getPixelSizeForLayoutSize(1),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(10)
    },
    clickableDots: {
        height: PixelRatio.getPixelSizeForLayoutSize(18),
        padding: PixelRatio.getPixelSizeForLayoutSize(4),
        marginTop: PixelRatio.getPixelSizeForLayoutSize(6),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(3),
        position: 'absolute',
        left: 0,
        top: 0
    },
    info: {
        flexDirection: 'column',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(6),
        marginRight: PixelRatio.getPixelSizeForLayoutSize(12),
        alignItems: 'flex-end'
    },
    itemName: {
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
        color: '#000',
    },
    rowItems:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(3),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(3),
    },
    simpleText: {
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    likeImage: {
        width: PixelRatio.getPixelSizeForLayoutSize(10),
        height: PixelRatio.getPixelSizeForLayoutSize(10),
        resizeMode: 'center',
        alignSelf: 'center',
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(3),

    },
    image: {
        marginRight: PixelRatio.getPixelSizeForLayoutSize(7),
        height: PixelRatio.getPixelSizeForLayoutSize(40),
        width: PixelRatio.getPixelSizeForLayoutSize(40),
        resizeMode: 'cover',
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(2),
        alignSelf: 'center',
    },
    lineDelimiter: {
        height: PixelRatio.getPixelSizeForLayoutSize(0.5),
        backgroundColor: '#c5c2c2'
    },

});
