import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,
    Text,
    PixelRatio,
    TouchableOpacity,
    Animated

} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import {ItemsYouSell} from '../Tabs/ItemsYouSell';
import {ItemsYouSold} from '../Tabs/ItemsYouSold';

const settingsIcon = require('../icons/pngs/settings_icon.png');


const FirstRoute = () => <ItemsYouSold/>;
const SecondRoute = () => <ItemsYouSell/>;

export default class Profile extends Component<Props> {

    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>

    };

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'נמכר' },
                { key: 'second', title: 'למכירה' },
            ],
        };
    }

    _handleIndexChange = index => this.setState({ index });


    _renderHeader = props => <TabBar indicatorStyle={{ backgroundColor: '#823aad', height: 2 }}
                                     tabStyle={{backgroundColor: '#FFF'}}
                                     labelStyle={{color: '#000'}} {...props} />;


    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    render() {
        return (
            <View style={styles.container}>
                {/* 1ST HEADER - PROFILE PIC + SETTINGS ICON */}
                <View style={styles.row1}>

                    <Image style={styles.settingsIcon} source={settingsIcon}/>
                    <Image style={styles.roundIconPic} source={{
                        uri: 'http://graph.facebook.com/1766634043356958/picture?type=square'
                    }}/>
                </View>
                <Text style={styles.usernameTextCenter}>{'Omri Attiya'}</Text>
                <View style={styles.lineDelimiter}/>

                <TabViewAnimated
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onIndexChange={this._handleIndexChange}
                />
            </View>
        )
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    icon: {
        width: PixelRatio.getPixelSizeForLayoutSize(6.5),
        height: PixelRatio.getPixelSizeForLayoutSize(6.5),
        resizeMode: 'cover',
    },
    row1: {
        height: PixelRatio.getPixelSizeForLayoutSize(14),
        margin: PixelRatio.getPixelSizeForLayoutSize(8),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(3),
        flexDirection: 'row',
        justifyContent: 'center'
    },
    roundIconPic: {
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(50),
        width: PixelRatio.getPixelSizeForLayoutSize(14),
        height: PixelRatio.getPixelSizeForLayoutSize(14),
        resizeMode: 'cover',
    },
    settingsIcon: {
        width: PixelRatio.getPixelSizeForLayoutSize(10),
        height: PixelRatio.getPixelSizeForLayoutSize(10),
        position: 'absolute',
        left: 0,
    },
    usernameTextCenter: {
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(9)
    },
    lineDelimiter: {
        height: PixelRatio.getPixelSizeForLayoutSize(0.5),
        backgroundColor: '#c5c2c2'
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: PixelRatio.getPixelSizeForLayoutSize(5),
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },

});

