import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const percent = 0.4;
const window = Dimensions.get('window');
const renderedHeight = percent*window.height;
const radius = 10;

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
        flex: 1,
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 0,
        height:renderedHeight,
    },
    image: {
        width:'100%',
        height: '80%',
        resizeMode:'cover',
        borderRadius: radius,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        borderBottomRightRadius: radius,
        borderBottomLeftRadius: radius,
        backgroundColor: '#FFFFFF',
        color: '#222222',
        textShadowColor: '#AAAAAA',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10

    }
});
