/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    Dimensions
} from 'react-native';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

let screenSize = Dimensions.get('window');
let buttonSize = {height: 0.11, width: 0.85};
let buttonPosition = {top: 0.7,left:(1-buttonSize.width)/2};
let onClickColor = '#f2f0ff';

const styles = StyleSheet.create({
    loginButtonImage: {
        flex: 0,
        height: buttonSize.height * screenSize.height,
        width: buttonSize.width * screenSize.width,
        resizeMode: 'stretch'
    },
    backgroundImage: {
        position: 'absolute',
        height: screenSize.height,
        width: screenSize.width,
        resizeMode: 'stretch'
    },
    loginButton: {
        position: 'absolute',
        marginTop: screenSize.height * buttonPosition.top,
        marginLeft: screenSize.width * buttonPosition.left
    }
});

type Props = {};
let background = require('../Images/placeholder.jpg');
let loginButtonBackground = require('../Images/loginButton_he.png');
let buttonView = <Image source={loginButtonBackground}
                        style={styles.loginButtonImage}/>;


export default class FacebookLogin extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {user: null}
    }

    render() {
        let _this = this;
        return (
            <View>
                <Image source={background} style={styles.backgroundImage}/>
                <View style={styles.loginButton}>
                    <FBLogin
                        onClickColor={onClickColor}
                        containerStyle={{}}
                        buttonView={buttonView}
                        ref={(fbLogin) => {
                            this.fbLogin = fbLogin
                        }}
                        permissions={["email", "user_friends"]}
                        loginBehavior={FBLoginManager.LoginBehaviors.Native}
                        onLogin={function (data) {
                            Alert.alert('Logged In!',JSON.stringify(data));
                            _this.setState({user: data.credentials});
                        }}
                        onLogout={function () {
                            Alert.alert("Logged out.");
                            _this.setState({user: null});
                        }}
                        onLoginFound={function (data) {
                            Alert.alert("Existing login found.",JSON.stringify(data));
                            _this.setState({user: data.credentials});
                        }}
                        onLoginNotFound={function () {
                            Alert.alert("No user logged in.");
                            _this.setState({user: null});
                        }}
                        onError={function (data) {
                            Alert.alert("ERROR",JSON.stringify(data));
                        }}
                        onCancel={function () {
                            Alert.alert("User cancelled.");
                        }}
                        onPermissionsMissing={function (data) {
                            Alert.alert("Check permissions!",JSON.stringify(data));
                        }}
                    />
                </View>
            </View>
        );
    }
};