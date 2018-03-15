import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

export class CategoryItem extends Component<props> {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} style={styles.container}>
                <Image source={this.props.categoryImagePath} style={styles.image}/>
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
