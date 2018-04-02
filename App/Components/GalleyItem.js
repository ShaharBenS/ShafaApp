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

let imgURI, profileURI, unlike, like;
let brandNameShort;


export class GalleyItem extends Component<props>
{

    constructor(props)
    {
        props.item.distance = '';
        super(props);
        //TODO: make sure the global.user.likedItems is always sorted
        this.state = {like: global.user.likedItems.indexOf(props.item._id) > -1};

        unlike = require('../icons/pngs/like_icon.png');
        like = require('../icons/pngs/like_icon_selected.png');
    }

    render()
    {
        imgURI = 'http://' + this.props.item.images[0];
        profileURI = 'http://graph.facebook.com/' + this.props.item.owner.userFacebookID + '/picture?type=square';
        let brandNameShort = JSON.parse(JSON.stringify(this.props.item.manufacturer)).split(' ')[0];

        this.props.item.distance = (distanceController.distance(
            global.currentLocation,
            {lng: this.props.item.location.coordinates[0], lat: this.props.item.location.coordinates[1]}));
        this.props.item.distance = distanceController.metersToLabel(this.props.item.distance);

        return (
            <View id={'container'} style={styles.container}>
                <View id={'upper'}>
                    <TouchableNativeFeedback onPress={()=>{
                        this.props.onPressCallback(this.props.item)
                    }}>
                        <Image id={'item'} source={{uri: imgURI}} style={styles.itemPic}/>
                    </TouchableNativeFeedback>
                    <TouchableOpacity activeOpacity={0.5} style={styles.profilePicTouchable}>
                        <Image id={'profile'} source={{uri: profileURI}} style={styles.profilePic}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>
                    {
                        //TODO: when liking
                        this.setState({like: !this.state.like})
                    }
                    } activeOpacity={0.5} style={styles.like}>
                        <Image id={'like'} source={this.state.like ? like : unlike}/>
                    </TouchableOpacity>
                </View>
                <View id={'info'} style={styles.textualInfo}>
                    <Text numberOfLines={2} id={'itemName'} style={styles.name}>{this.props.item.name}</Text>
                    <View id={'infoSpec'} style={styles.infoSpec}>
                        <Text numberOfLines={1} style={styles.simpleFontSize}>
                            <Text id={'company'}>{brandNameShort}</Text>
                            <Text> • </Text>
                            <Text id={'distance'}>
                                {this.props.item.distance.value}
                                {' '}
                                {this.props.item.distance.measurement}
                            </Text>
                            <Text> • </Text>
                            <Text id={'size'}>{this.props.item.size}</Text>
                        </Text>
                    </View>
                    <Text id={'price'} style={styles.price}>{this.props.item.price + ' ש"ח'}</Text>
                    <TouchableOpacity activeOpacity={0.5} style={styles.buyButton}>
                        <Text id={'buy'} style={styles.buyText}>לקנייה</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const colorBlack = '#4a4a4a';
const colorWhite = '#FFFFFF';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(5.7),
        marginRight: PixelRatio.getPixelSizeForLayoutSize(2.3),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(2.3),
        position: 'relative',
        backgroundColor: colorWhite,
        height: PixelRatio.getPixelSizeForLayoutSize(126),
        width: PixelRatio.getPixelSizeForLayoutSize(60),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(1),
    },
    itemPic: {
        alignSelf: 'center',
        width: PixelRatio.getPixelSizeForLayoutSize(58),
        height: PixelRatio.getPixelSizeForLayoutSize(58),
        resizeMode: 'cover',
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(2),
    },

    profilePic: {
        borderColor: colorWhite,
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(50),
        borderWidth: PixelRatio.getPixelSizeForLayoutSize(0.5),
        width: PixelRatio.getPixelSizeForLayoutSize(14.3),
        height: PixelRatio.getPixelSizeForLayoutSize(14.3),
        resizeMode: 'cover',
    },
    profilePicTouchable: {
        position: 'absolute',
        alignSelf: 'center',
        top: PixelRatio.getPixelSizeForLayoutSize(51),
    },
    like: {
        position: 'absolute',
        right: 0,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(3),
        marginRight: PixelRatio.getPixelSizeForLayoutSize(3)
    },
    textualInfo: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        top: PixelRatio.getPixelSizeForLayoutSize(65),
    },
    simpleFontSize: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        fontFamily: 'OpenSansHebrew-Regular'
    },
    name: {
        margin: PixelRatio.getPixelSizeForLayoutSize(5),
        textAlign: 'center',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        color: '#333333',
        fontFamily: 'OpenSansHebrew-Regular'
    },
    infoSpec: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: PixelRatio.getPixelSizeForLayoutSize(5),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(5),
        marginTop: -PixelRatio.getPixelSizeForLayoutSize(2)
    },
    price: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(2),
        color: colorBlack,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        fontFamily: 'OpenSansHebrew-Regular'
    },
    buyButton: {
        borderColor: colorBlack,
        borderWidth: PixelRatio.getPixelSizeForLayoutSize(0.5),
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(4),
    },
    buyText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(4.7),
        color: colorBlack,
        margin: PixelRatio.getPixelSizeForLayoutSize(2),
        fontFamily: 'OpenSansHebrew-Regular',
    },

});
