/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    Dimensions,
    ImageBackground,
    PixelRatio
} from 'react-native';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

let loginController = require('../Controllers/LoginController');

let screenSize = Dimensions.get('window');
let buttonSize = {height: 0.09896536, width: 0.76};
let buttonPosition = {top: 0.41070625, left: (1 - buttonSize.width) / 2};
let onClickColor = '#f2f0ff';
let backgroundPosition = 0.55195681511;
let logoSize = {height: 0.2775528, width: 0.3736};
let logoPosition = {top: 0.1003148, left: (1 - logoSize.width) / 2};
let facebookLogoSize = {height: 0.0508322, width: 0.048};

const styles = StyleSheet.create({
    loginButtonImage: {
        height: PixelRatio.getPixelSizeForLayoutSize(22),
        width: PixelRatio.getPixelSizeForLayoutSize(95),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    backgroundImage: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(99.7),
        height: PixelRatio.getPixelSizeForLayoutSize(122.7),
        width: PixelRatio.getPixelSizeForLayoutSize(125),
        resizeMode: 'stretch'
    },
    loginButton: {
        position: 'absolute',
        marginTop: PixelRatio.getPixelSizeForLayoutSize(91.3),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(15)
    },
    shafaLogo: {
        position: 'absolute',
        height: PixelRatio.getPixelSizeForLayoutSize(61.7),
        width: PixelRatio.getPixelSizeForLayoutSize(46.7),
        marginTop: PixelRatio.getPixelSizeForLayoutSize(22.3),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(40),
    },
    textStyle: {
        color: "#ffffff",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6.7),
        fontFamily: 'OpenSansHebrew-Regular'
    },
    facebookLogo: {
        height: PixelRatio.getPixelSizeForLayoutSize(11.3),
        width: PixelRatio.getPixelSizeForLayoutSize(6),
        resizeMode: 'stretch'
    }
});

type Props = {};
let background = require('../Images/login/login_img.png');
let loginButtonBackground = require('../Images/login/facebook_but_bg.png');
let shafaLogo = require('../Images/login/shafa_logo.png');
let facebookLogo = require('../Images/login/facebook_icon.png');

let buttonView =
    <ImageBackground source={loginButtonBackground}
                     imageStyle={{resizeMode: 'stretch'}}
                     style={styles.loginButtonImage}>
        <Image source={facebookLogo} style={styles.facebookLogo}/>
        <Text style={styles.textStyle}>התחברי עם פייסבוק</Text>
    </ImageBackground>;


export default class FacebookLogin extends Component<Props>
{
    constructor(props)
    {
        super(props);
        this.state = {user: null};
    }

    render()
    {
        let _this = this;
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Image source={background} style={styles.backgroundImage}/>
                <Image source={shafaLogo} resizeMode={'contain'} style={styles.shafaLogo}/>
                <View style={styles.loginButton}>
                    <FBLogin
                        onClickColor={onClickColor}
                        containerStyle={{}}
                        buttonView={buttonView}
                        ref={(fbLogin) =>
                        {
                            this.fbLogin = fbLogin
                        }}
                        permissions={["email", "user_friends"]}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        onLogin={function (data)
                        {
                            _this.setState({user: data.credentials.user});
                            let userPromise = loginController.addUser(data);
                            userPromise.then(_user =>
                            {
                                global.user = _user;
                                navigate('mainScreen');
                            })
                                .catch(err =>
                                {
                                    Alert.alert("שגיאה", JSON.stringify(err));
                                    console.log(err);
                                })

                        }}
                        onLogout={function ()
                        {
                            _this.setState({user: null});
                            navigate('loginScreen')
                        }}
                        onLoginFound={function (data)
                        {
                            _this.setState({user: data.credentials.user});
                            let userPromise = loginController.getUser(data);
                            userPromise.then(_user =>
                            {
                                global.user = _user;
                                navigate('mainScreen');
                            }).catch(err =>
                                {
                                    Alert.alert("שגיאה",JSON.stringify(err));
                                    console.log(err);
                                });
                        }}
                        onLoginNotFound={function ()
                        {
                            _this.setState({user: null});
                        }}
                        onError={function (data)
                        {
                            Alert.alert("שגיאה", JSON.stringify(data));
                        }}
                        onCancel={function ()
                        {
                            Alert.alert("בוטל.");
                        }}
                        onPermissionsMissing={function (data)
                        {
                            Alert.alert("אין לך רשות", JSON.stringify(data));
                        }}
                    />
                </View>
            </View>
        );
    }

};