import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';
import {vs} from '../Controllers/global';

export class GalleyItem extends Component<props> {



    constructor(props) {
        super(props);
        this.state = {like: false};
    }


    render() {

        let img = require('../Images/placeholder.jpg');
        let logo = require('../Images/loginButton_he.png');
        let unlike = require('../icons/pngs/like_icon.png');
        let like = require('../icons/pngs/like_icon_selected.png');

        return (
            <View id={'container'} style={styles.container}>
                <View id={'upper'}>
                    <Image id={'item'} source={img} style={styles.itemPic}/>
                    <TouchableOpacity activeOpacity={0.5} style={styles.profilePicTouchable}>
                        <Image id={'profile'} source={logo} style={styles.profilePic}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({like: !this.state.like})} activeOpacity={0.5}
                                      style={styles.like}>
                        <Image id={'like'} source={this.state.like ? like : unlike}/>
                    </TouchableOpacity>
                </View>
                <View id={'info'} style={styles.textualInfo}>
                    <Text numberOfLines={2} id={'itemName'} style={styles.name}>{this.props.itemName}</Text>
                    <View id={'infoSpec'} style={styles.infoSpec}>
                        <Text numberOfLines={1} style={styles.simpleFontSize}>
                            <Text id={'company'}>{this.props.itemCompany}</Text>
                            <Text> • </Text>
                            <Text id={'distance'}>{this.props.itemDistance}</Text>
                            <Text> • </Text>
                            <Text id={'size'}>{this.props.itemSize}</Text>
                        </Text>
                    </View>
                    <Text id={'price'} style={styles.price}>{this.props.itemPrice}₪</Text>
                    <TouchableOpacity activeOpacity={0.5} style={styles.buyButton}>
                        <Text id={'buy'} style={styles.buyText}>BUY</Text>
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
        height: renderedHeight,
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
    price: {marginTop: vs(3), color: colorBlack, fontSize: vs(10), fontFamily: 'OpenSansHebrew-Regular'},
    buyButton: {
        borderColor: colorBlack,
        borderWidth: vs(1),
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vs(8),
    },
    buyText: {
        fontSize: vs(10),
        color: colorBlack,
        margin: vs(3),
        paddingRight: vs(10),
        paddingLeft: vs(10),
        fontFamily: 'OpenSansHebrew-Regular',
    },

});
