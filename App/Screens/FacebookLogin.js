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
    ActivityIndicator
} from 'react-native';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

let loginController = require('../Controllers/LoginController');

let screenSize = Dimensions.get('window');
let buttonSize = {height: 0.11, width: 0.85};
let buttonPosition = {top: 0.7, left: (1 - buttonSize.width) / 2};
let activityIndicatorPosition = {top: buttonPosition.top + buttonSize.height + 0.02};
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
    },
    activityIndicatorView: {
        marginTop: screenSize.height * activityIndicatorPosition.top,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

type Props = {};
let background = require('../Images/placeholder.jpg');
let loginButtonBackground = require('../Images/loginButton_he.png');
let buttonView = <Image source={loginButtonBackground}
                        style={styles.loginButtonImage}/>;


export default class FacebookLogin extends Component<Props>
{
    constructor(props)
    {
        super(props);
        this.state = {user: null, shouldShowLoading: false};
    }

    render()
    {
        let _this = this;
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Image source={background} style={styles.backgroundImage}/>
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
                            _this.setState(previousState =>
                            {
                                return {user: data.credentials.user, previousStateLoading: true}
                            });
                            let userPromise = loginController.addUser(data);
                            userPromise.then(response =>
                            {
                                response.then(data =>
                                {           //TODO: data.alreadyExists check if true and add a welcome back msg.
                                    if (data.output === "SUCCESS")
                                    {
                                        global.user = data.user;
                                        navigate('mainScreen');
                                    }
                                    else
                                    {
                                        Alert.alert("Error 1")
                                    }
                                })
                            }).catch((err =>
                            {
                                _this.setState(previousState =>
                                {
                                    return {shouldShowLoading: false, user: previousState.user}
                                });
                                Alert.alert('Error 2');
                                console.log(err);
                            }));
                        }}
                        onLogout={function ()
                        {
                            _this.setState({user: null, shouldShowLoading: false});
                            navigate('loginScreen')
                        }}
                        onLoginFound={function (data)
                        {
                            _this.setState(previousState =>
                            {
                                return {user: data.credentials.user, previousStateLoading: true}
                            });
                            let userPromise = loginController.getUser(data);
                            userPromise.then((response) =>
                            {
                                response.json().then(data =>
                                {
                                    if (data.output === "SUCCESS")
                                    {
                                        global.user = data.user;
                                        navigate('mainScreen');
                                    }
                                    else
                                    {
                                        Alert.alert("Error 3")
                                    }
                                });
                            })
                                .catch((err) =>
                                {
                                    _this.setState(previousState =>
                                    {
                                        return {shouldShowLoading: false, user: previousState.user}
                                    });
                                    console.log(err);
                                    Alert.alert("Error 4");
                                });
                        }}
                        onLoginNotFound={function ()
                        {
                            _this.setState({user: null, shouldShowLoading: false});
                        }}
                        onError={function (data)
                        {
                            Alert.alert("ERROR", JSON.stringify(data));
                        }}
                        onCancel={function ()
                        {
                            Alert.alert("User cancelled.");
                        }}
                        onPermissionsMissing={function (data)
                        {
                            Alert.alert("Check permissions!", JSON.stringify(data));
                        }}
                    />
                </View>
                <View style={styles.activityIndicatorView}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.shouldShowLoading}/>
                </View>
            </View>
        );
    }
};