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
const radius = 5;

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
        marginTop: 5,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 0,
        height:renderedHeight,
        backgroundColor: '#FF000000',
    },
    image: {
        width:'100%',
        height:'80%',
        resizeMode:'cover',
        borderRadius: radius,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        padding: 5,
        borderBottomRightRadius: radius,
        borderBottomLeftRadius: radius,
        backgroundColor: '#DDDDDD',
    }
});
