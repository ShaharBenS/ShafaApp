import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
} from 'react-native';


export class CategoryItem extends Component<props> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPressCallback}
                activeOpacity={0.5} style={styles.container}>
                <Image source={this.props.categoryImagePath} style={styles.image}/>
                <Text style={styles.title}>{this.props.categoryName}</Text>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: PixelRatio.getPixelSizeForLayoutSize(3),
        height:PixelRatio.getPixelSizeForLayoutSize(100),
    },
    image: {
        width:'100%',
        height: '90%',
        resizeMode:'cover',
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(1),
    },
    title: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6.7),
        textAlign: 'right',
        paddingTop: PixelRatio.getPixelSizeForLayoutSize(3),
        fontFamily: 'OpenSansHebrew-Regular',
        color: '#4a4a4a',


    }
});
