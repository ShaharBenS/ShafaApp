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
    Alert
} from 'react-native';

import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

type Props = {};
export default class App extends Component<Props> {
    render() {
        let _this = this;
        return (
            <View style = {{alignItems:'flex-end',flexDirection:'column'}}>
                <FBLogin style={{height:100 }}
                           ref={(fbLogin) => { this.fbLogin = fbLogin }}
                           permissions={["email","user_friends"]}
                           loginBehavior={FBLoginManager.LoginBehaviors.Native}
                           onLogin={function(data){
                               Alert.alert("Logged in!");
                               Alert.log(data);
                               _this.setState({ user : data.credentials });
                           }}
                           onLogout={function(){
                               console.log("Logged out.");
                               _this.setState({ user : null });
                           }}
                           onLoginFound={function(data){
                               console.log("Existing login found.");
                               console.log(data);
                               _this.setState({ user : data.credentials });
                           }}
                           onLoginNotFound={function(){
                               console.log("No user logged in.");
                               _this.setState({ user : null });
                           }}
                           onError={function(data){
                               console.log("ERROR");
                               console.log(data);
                           }}
                           onCancel={function(){
                               console.log("User cancelled.");
                           }}
                           onPermissionsMissing={function(data){
                               console.log("Check permissions!");
                               console.log(data);
                           }}
            /></View>
        );
    }
};

