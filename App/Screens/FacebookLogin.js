/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image
} from 'react-native';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {user:null}
    }

    render() {
        let _this = this;
        return (
            <View style = {{alignItems:'flex-end',flexDirection:'column'}}>
                <Image source={_this.state.user == null ?
                    {uri:'http://www.solidbackgrounds.com/851x315-baby-powder-solid-color-background.html'} :
                    {uri:'https://graph.facebook.com/'+_this.state.user.userId+'/picture?type=large'}}
                       style = {{height:120,width:120}}/>
                <Text>{
                    _this.state.user == null ? 0 : _this.state.user.userId
                }</Text>
                <FBLogin
                    ref={(fbLogin) => { this.fbLogin = fbLogin }}
                    permissions={["email","user_friends"]}
                    loginBehavior={FBLoginManager.LoginBehaviors.Native}
                    onLogin={function(data){
                        Alert.alert('Logged In!',JSON.stringify(data));
                        _this.setState({ user : data.credentials });
                    }}
                    onLogout={function(){
                        Alert.alert("Logged out.");
                        _this.setState({ user : null });
                    }}
                    onLoginFound={function(data){
                        Alert.alert("Existing login found.",JSON.stringify(data));
                        _this.setState({ user : data.credentials });
                    }}
                    onLoginNotFound={function(){
                        Alert.alert("No user logged in.");
                        _this.setState({ user : null });
                    }}
                    onError={function(data){
                        Alert.alert("ERROR",JSON.stringify(data));
                    }}
                    onCancel={function(){
                        Alert.alert("User cancelled.");
                    }}
                    onPermissionsMissing={function(data){
                        Alert.alert("Check permissions!",JSON.stringify(data));
                    }}
                /></View>
        );
    }
};

