import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
    Dimensions,Alert
} from 'react-native';
import {vs, minUnit} from '../Controllers/global';


let distanceController = require('../Controllers/DistanceController');

let imgURI,profileURI,unlike,like;
let brandNameShort;
export class GalleyItem extends Component<props> {

    constructor(props)
    {

        props.item.distance = '';
        super(props);
        this.state = { like: global.user.likedItems.indexOf(props.item.owner) > -1 };



        unlike = require('../icons/pngs/like_icon.png');
        like = require('../icons/pngs/like_icon_selected.png');
    }


    render() {
        imgURI = 'http://'+this.props.item.images[0];
        profileURI = 'http://graph.facebook.com/'+this.props.item.userFacebookID+'/picture?type=square';
        let brandNameShort = JSON.parse(JSON.stringify(this.props.item.manufacturer)).split(' ')[0];

        this.props.item.distance = (distanceController.distance(
            global.currentLocation,
            {lng:this.props.item.location.coordinates[0],lat:this.props.item.location.coordinates[1]}));
        this.props.item.distance = distanceController.metersToLabel(this.props.item.distance);

        return (
            <View id={'container'} style={styles.container}>
                <View id={'upper'} >
                    <Image id={'item'} source={{uri:imgURI}} style={styles.itemPic}/>
                    <TouchableOpacity activeOpacity={0.5} style={styles.profilePicTouchable}>
                    <Image id={'profile'} source={{uri:profileURI}} style={styles.profilePic}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        //TODO: when liking
                        this.setState({like: !this.state.like})}
                    } activeOpacity={0.5} style={styles.like}>
                        <Image id={'like'} source={this.state.like ? like : unlike} />
                    </TouchableOpacity>
                </View>
                <View id={'info'} style={styles.textualInfo}>
                    <Text numberOfLines={2} id={'itemName'} style={styles.name}>{this.props.itemName}</Text>
                    <View id={'infoSpec'} style={styles.infoSpec}>
                        <Text numberOfLines={1} style={styles.simpleFontSize}>
                            <Text id={'company'}>{this.props.itemCompany}</Text>
                        <Text style={styles.simpleFontSize}>
                            <Text id={'company'} >{brandNameShort}</Text>
                            <Text> • </Text>
                            <Text id={'distance'}>
                                {this.props.item.distance.value}
                                {' '}
                                {this.props.item.distance.measurement}
                            </Text>
                            <Text> • </Text>
                            <Text id={'size'} >{this.props.item.size}</Text>
                        </Text>
                    </View>
                    <Text id={'price'} style={styles.price}>{this.props.item.price+' ש"ח'}</Text>
                    <TouchableOpacity activeOpacity={0.5} style={styles.buyButton}>
                        <Text id={'buy'} style={styles.buyText}>לקנייה</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const percentHeight = 0.5;
const percentWidth = 0.5;
const window = Dimensions.get('window');
const renderedHeight = percentHeight * window.height;
const renderedWidth = percentWidth * window.width;
const imageSize = renderedWidth - vs(5);
const profileImageSize = imageSize / vs(2);

const colorBlack = '#4a4a4a';
const colorWhite = '#FFFFFF';


const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: vs(8),
        marginRight: vs(3),
        marginLeft: vs(3),
        position: 'relative',
        backgroundColor: colorWhite,
        height: vs(renderedHeight/2),
        width: vs(renderedWidth/2),
        borderRadius: vs(1),

    },
    itemPic: {
        alignSelf: 'center',
        width: imageSize,
        height: imageSize,
        resizeMode: 'cover',
        borderRadius: vs(2),

    },

    profilePic: {
        borderColor: colorWhite,
        borderRadius: vs(55),
        borderWidth: vs(1),
        width: profileImageSize,
        height: profileImageSize,
        resizeMode: 'cover',
    },
    profilePicTouchable: {
        position: 'absolute',
        alignSelf: 'center',
        top: (imageSize * 0.82),


    },
    like: {
        position: 'absolute',
        right: 0,
        marginTop: vs(8),
        marginRight: vs(8)
    },
    textualInfo: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        top: (imageSize + profileImageSize / vs(2)),
    },
    simpleFontSize: {fontSize: vs(10), fontFamily: 'OpenSansHebrew-Light'},
    name: {margin: vs(5), textAlign: 'center', fontSize: vs(10), color: '#333333', fontFamily: 'OpenSansHebrew-Light'},
    infoSpec: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: vs(5),
        marginLeft: vs(5),
        marginTop: -vs(3)
    },
    price: {marginTop: 5, color: colorBlack, fontSize:18, fontFamily: 'OpenSansHebrewCondensed-Regular' },
    buyButton: {
        borderColor: colorBlack,
        borderWidth: 1,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buyText: {fontSize:18, color:colorBlack, margin: 5, fontFamily: 'OpenSansHebrewCondensed-Regular',},

});
