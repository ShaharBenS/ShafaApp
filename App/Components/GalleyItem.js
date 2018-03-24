import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

export class GalleyItem extends Component<props> {
    static navigationOptions = {
        labelStyle: { display: 'none'},
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>
    };
    render() {
        let img = require('../Images/placeholder.jpg');
        let logo = require('../Images/loginButton_he.png');
        let like = require('../icons/pngs/like_icon_selected.png');
        return (
            <View id={'container'} style={styles.container}>
                <View id={'upper'} >
                    <Image id={'item'} source={img} style={styles.itemPic}/>
                    <Image id={'profile'} source={logo} style={styles.profilePic}/>
                    <TouchableOpacity activeOpacity={0.5} style={styles.like}>
                        <Image id={'like'} source={like} />
                    </TouchableOpacity>
                </View>
                <View id={'info'} style={styles.textualInfo}>
                    <Text numberOfLines={2} id={'itemName'} style={styles.name}>This is a large example of a name text</Text>
                    <View id={'infoSpec'} style={styles.infoSpec}>
                        <Text style={styles.simpleFontSize}>
                            <Text id={'company'} >ZARA</Text>
                            <Text style={styles.delimiter}>•</Text>
                            <Text id={'size'} >XL</Text>
                            <Text style={styles.delimiter}>•</Text>
                            <Text id={'distance'} >2 KM</Text>
                        </Text>
                    </View>
                    <Text id={'price'} style={styles.price}>120$</Text>
                    <TouchableOpacity activeOpacity={0.5} style={styles.buyButton}>
                        <Text id={'buy'} style={styles.buyText}>BUY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const percentHeight = 0.6;
const percentWidth = 0.5;
const window = Dimensions.get('window');
const renderedHeight = percentHeight*window.height;
const renderedWidth = percentWidth*window.width;
const imageSize = renderedWidth-10;
const profileImageSize = imageSize/3;

const colorBlack = '#000000';
const colorWhite = '#FFFFFF';


const styles = StyleSheet.create({
    icon: {
        width:24,
        height:24,
        resizeMode:'cover',
        marginTop: 10,

    },
    container: {
        flex: 1,
        marginTop: 5,
        marginRight: 5,
        marginLeft: 5,
        position: 'relative',
        backgroundColor: colorWhite,
        height: renderedHeight,
        borderRadius: 2,

    },
    itemPic: {
        alignSelf: 'center',
        width: imageSize,
        height: imageSize,
        resizeMode:'cover',
        borderRadius: 4,

    },

    profilePic:{
        position: 'absolute',
        alignSelf: 'center',
        top: (imageSize*0.82),
        borderColor: colorWhite,
        borderRadius: 100,
        borderWidth: 2,
        width: profileImageSize,
        height: profileImageSize,
        resizeMode:'cover',
    },
    like: {
        position: 'absolute',
        right: 0,
        marginTop: 15,
        marginRight: 15,
    },
    textualInfo: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: (imageSize+profileImageSize/2.),
    },
    simpleFontSize: {  fontSize:14 },
    name: { padding:10, textAlign: 'center', fontSize:14, color: '#333333' },
    infoSpec: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight:10,
        marginLeft:10,
    },
    delimiter: {marginRight:5, marginLeft: 5},
    price: {marginTop: 5, color: colorBlack, fontSize:16,},
    buyButton: {
        borderColor: colorBlack,
        borderWidth: 1,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buyText: {fontSize:16, color:colorBlack, margin: 5},

});
