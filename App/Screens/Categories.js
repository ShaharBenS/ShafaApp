import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    AppRegistry
} from 'react-native';

class Categories extends Component<props> {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.container}>
                <Image source={require(this.props.categorySource)} style={styles.image}/>
                <Text style={styles.title}>{this.props.categoryName}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 0,
        margin: 10,
        height:'40%',
        backgroundColor:'#EFEFEF'
    },
    image: {
        width:'100%',
        height:'80%',
        resizeMode:'cover',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        padding: 5
    }
});