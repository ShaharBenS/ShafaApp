import React, {Component} from 'react';
import {
    Text,
    Image,
    StyleSheet,
    View,
    TouchableHighlight,
    Alert,
    Dimensions,
    PixelRatio
} from 'react-native';
import {Pages} from 'react-native-pages'
import {vs} from "../Controllers/global";


let screenSize = Dimensions.get('window');
let shareIcon = require('../icons/pngs/share_icon.png');
let backArrow = require('../icons/pngs/next_arrow.png');
let likeHeart = require('../icons/pngs/like_icon.png');
let likeHeartSelected = require('../icons/pngs/like_icon_selected.png');


let detailString = ' 1320 SH • 1023 KM • Size 32Leg 45 Waist • ASOS TAIL COMPANY';
export default class ItemPage extends Component
{
    render()
    {
        return (
            <View style={styles.pageView}>
                {/*Header*/}
                <View style={styles.headerStyle}>
                    <Image style={styles.shareIcon} resizeMode={'stretch'} source={shareIcon}/>
                    <View style={styles.itemNameView}>
                        <Text style={styles.textRegular}>שמלה מכופתרת צהובה</Text>
                    </View>
                    <Image style={styles.backArrow} resizeMode={'stretch'} source={backArrow}/>
                </View>

                {/*Body*/}

                {/*Images View*/}
                <View style={styles.imagesView}>
                    <Pages>
                        <Image resizeMode={'cover'}
                               style={styles.imageStyle}
                               source={{uri: 'http://images.asos-media.com/products/asos-design-mix-match-tailored-blazer/8890584-1-popgreen'}}/>
                        <Image
                            resizeMode={'cover'}
                            style={styles.imageStyle}
                            source={{uri: 'http://images.asos-media.com/products/asos-design-mix-match-tailored-blazer/8890584-2'}}/>
                        <Image
                            resizeMode={'cover'}
                            style={styles.imageStyle}
                            source={{uri: 'http://images.asos-media.com/products/asos-design-mix-match-tailored-blazer/8890584-3'}}/>
                    </Pages>
                </View>

                {/*Details about the item*/}
                <Text style={[styles.textRegular,{textAlign:'center'}]}>
                    {detailString}
                    {/*<Text style={styles.textRegular}>1320 ש"ח</Text>
                    <Text style={styles.textRegular}>•</Text>
                    <Text style={styles.textRegular}>103 ק"מ</Text>
                    <Text style={styles.textRegular}>•</Text>
                    <Text style={styles.textRegular}>מידה 34Leg 24Waist</Text>
                    <Text style={styles.textRegular}>•</Text>
                    <Text style={styles.textRegular}>ASOS Tall company</Text>*/}
                </Text>

                {/*Description*/}
                <Text style={[styles.textRegular,{textAlign:'center'}]}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque harum, magnam neque porro ullam voluptatem?
                </Text>

                {/*Buy button*/}
                <TouchableHighlight style={styles.buyButton}>
                    <Text style={styles.textRegular}>
                        לקנייה
                    </Text>
                </TouchableHighlight>


                {/*Owner, contact and likes*/}

                <View style={styles.outerOwnerAndLikesContainer}>
                    <View style={styles.horizontalLineDelimiter}/>
                    <View style={styles.ownerAndLikesContainer}>
                        {/*Likes*/}
                        <View style={{flexDirection:'row',
                                justifyContent:'space-between',width:screenSize.width*0.2,
                            alignItems:'center'}}>
                            <Text style={styles.textLight}>13012</Text>
                            <Image style={styles.heartStyle} source={likeHeart}/>
                        </View>

                        <View style={styles.verticalLineDelimiter}/>

                        {/*Contact seller*/}
                        <TouchableHighlight>
                            <Text style = {styles.textLight}>צור קשר</Text>
                        </TouchableHighlight>

                        <View style={styles.verticalLineDelimiter}/>

                        {/*Profile*/}
                        <View style={{flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-evenly',width:screenSize.width*0.4}}>
                            <Text style = {styles.textLight}>שחר בן שטרית</Text>
                            <Image style={styles.profilePic} source = {{uri:'http://graph.facebook.com/100010453330376/picture?type=square'}}/>
                        </View>
                    </View>
                    <View style={styles.horizontalLineDelimiter}/>
                </View>

                <View style={{height:screenSize.height * 0.05}}/>

            </View>
        );
    }
}


const styles = StyleSheet.create({

    pageView: {
        alignItems: 'center',
        justifyContent: 'space-between',
        height: screenSize.height,
        width: screenSize.width,
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
        width: screenSize.width * 0.9,
    },
    itemNameView: {
        alignItems: 'center',
        width: screenSize.width * 0.6
    },
    textRegular: {
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
        color: '#4a4a4a'
    },
    shareIcon: {
        height: PixelRatio.getPixelSizeForLayoutSize(7),
        width: PixelRatio.getPixelSizeForLayoutSize(7)
    },
    backArrow: {
        height: PixelRatio.getPixelSizeForLayoutSize(5),
        width: PixelRatio.getPixelSizeForLayoutSize(2),
    },
    imagesView: {
        width: screenSize.width * 0.86,
        height: screenSize.height*0.4871
    },
    imageStyle:{
        flex:1
    },
    buyButton: {
        height: screenSize.height * 0.0629,
        width: screenSize.width * 0.704,
        borderStyle: 'solid',
        borderColor: '#4a4a4a',
        borderWidth: PixelRatio.getPixelSizeForLayoutSize(0.3),
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontalLineDelimiter: {
        height: PixelRatio.getPixelSizeForLayoutSize(0.4),
        width: PixelRatio.getPixelSizeForLayoutSize(117),
        backgroundColor: '#c5c2c2'
    },
    verticalLineDelimiter: {
        width: PixelRatio.getPixelSizeForLayoutSize(0.3),
        height: PixelRatio.getPixelSizeForLayoutSize(7),
        backgroundColor: '#c5c2c2'
    },
    outerOwnerAndLikesContainer:{
        alignItems:'center',
        justifyContent: 'space-between',
        width: PixelRatio.getPixelSizeForLayoutSize(117),
        height: screenSize.height * 0.07
    },
    ownerAndLikesContainer: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-evenly',
        width: PixelRatio.getPixelSizeForLayoutSize(117),
        height: screenSize.height * 0.06
    },
    textLight: {
        fontFamily: 'OpenSansHebrew-Light',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        color: '#4a4a4a'
    },
    profilePic: {
        borderColor: '#fff',
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20),
        borderWidth: PixelRatio.getPixelSizeForLayoutSize(0.3),
        width: PixelRatio.getPixelSizeForLayoutSize(10.7),
        height: PixelRatio.getPixelSizeForLayoutSize(10.7),
        resizeMode: 'cover',
    },
    heartStyle:{
        height:PixelRatio.getPixelSizeForLayoutSize(7),
        width:PixelRatio.getPixelSizeForLayoutSize(9)
    }
});
