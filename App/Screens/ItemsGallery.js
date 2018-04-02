/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    PixelRatio,

} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import {GalleyItem} from '../Components/GalleyItem';
import {SelectorItem} from '../Components/SelectorItem';
import {StackNavigator} from 'react-navigation';
import Filter from "./Filter";
import ItemPage from "./ItemPage";


const itemsController = require('../Controllers/ItemsContoller');
const maxChunksParallel = 50;
const itemsPerChunk = 8;
const dialogHeight = PixelRatio.getPixelSizeForLayoutSize(100);
const textArray = ["ללא מיון", "הכי קרוב אלי", "מהזול ליקר", "מהיקר לזול", "החדש ביותר"];

let currentChunk = 0;
let selectedIndexToName = (index) =>
{
    switch (index)
    {
        case 0:
            return 'random';
        case 1:
            return 'closest';
        case 2:
            return 'cheapest';
        case 3:
            return 'expansive';
        case 4:
            return 'newest';
        default:
            return 'random';
    }
};


class ItemsPage extends Component<Props>
{

    static navigationOptions = {
        labelStyle: {display: 'none'},
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>
    };

    constructor(props)
    {
        super(props);
        const {navigate} = this.props.navigation;

        this.state = {
            selectedIndex: 0,
            disableArray: [false, true, true, true, true],
            items: []
        };

        this.changeSort(0);

    }


    changeSort(index)
    {
        currentChunk = 0;
        let preference = selectedIndexToName(index);
        let location = preference === 'closest' ?
            [global.currentLocation.lng, global.currentLocation.lat] : undefined;



        itemsController.getItems(global.currentCategoryID, preference,
            0, itemsPerChunk,
            location)
            .then(items =>
            {
                this.setState({items: items});
            })
            .catch(err =>
            {
                Alert.alert('שגיאה', JSON.stringify(err))
            });
    }

    render()
    {
        let {navigate} = this.props.navigation;

        let selectorsArray = [];

        for (let i = 0; i < textArray.length; i++)
        {
            selectorsArray.push(<SelectorItem textToDisplay={textArray[i]} disableDot={this.state.disableArray[i]}
                                              onPress={() =>
                                              {
                                                  let disables = this.state.disableArray;
                                                  for (let j = 0; j < textArray.length; j++)
                                                      disables[j] = j !== i;
                                                  this.setState({selectedIndex: i, disableArray: disables});
                                                  this.changeSort(i);
                                              }
                                              }/>)
        }


        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.categoryName}>CATEGORY NAME</Text>
                    <Image style={styles.backArrow} source={require('../icons/pngs/next_arrow.png')}/>
                </View>
                <View style={styles.lineDelimiter}/>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.simpleView} onPress={() =>
                    {
                        navigate('Filter')
                    }}>
                        <Text style={styles.simpleText}>סינון</Text>
                    </TouchableOpacity>

                    <View style={styles.upperBar}/>

                    <TouchableOpacity style={styles.simpleView} onPress={() =>
                    {
                        this.popupDialog.show();
                    }}>
                        <Text style={styles.simpleText}>מיון</Text>

                    </TouchableOpacity>


                </View>
                <PopupDialog dialogStyle={styles.dialogCustom}
                             width={0.8} height={dialogHeight} ref={(popupDialog) =>
                {
                    this.popupDialog = popupDialog;
                }}>
                    <View style={{flex: 1}}>
                        {selectorsArray}

                    </View>
                </PopupDialog>

                <View style={styles.lineDelimiter}/>

                <FlatList
                    onEndReached={() =>
                    {
                        //TODO: increase significantly the amount of items being fetched at the beginning. And add a 'next page' button when end reached
                        currentChunk++;
                        let preference = selectedIndexToName(this.state.selectedIndex);
                        itemsController.getItems(global.currentCategoryID, preference,
                            currentChunk * itemsPerChunk, itemsPerChunk, preference === 'closest' ?
                                [global.currentLocation.lng, global.currentLocation.lat]
                                : undefined).then(items =>
                        {
                            this.setState(previousState =>
                            {
                                return {items: [...previousState.items, ...items]}
                            })
                        }).catch(err =>
                        {
                            Alert.alert("שגיאה", JSON.stringify(err))
                        });
                    }}
                    onEndReachedThreshold={0.9}
                    numColumns={2}
                    data={this.state.items}
                    renderItem={(item) =>
                    {
                        return <GalleyItem onPressCallback={(_item) =>
                        {
                            global.currentItem = _item;
                            navigate('ItemPage')
                        }} initialState = {global.user.likedItems.indexOf(item.item._id) > -1} item = {item.item}/>
                    }}
                    keyExtractor={(items, index) => index}
                />


            </View>
        );
    }


}


let ItemsGallery = StackNavigator({
    ItemsPage: {screen: ItemsPage},
    ItemPage: {screen: ItemPage},
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default ItemsGallery;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: PixelRatio.getPixelSizeForLayoutSize(6.5),
        height: PixelRatio.getPixelSizeForLayoutSize(6.5),
        resizeMode: 'cover',
    },
    header: {
        flex: 0.12,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryName: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
        fontFamily: 'OpenSansHebrew-Regular',
        color: '#4a4a4a',
        margin: PixelRatio.getPixelSizeForLayoutSize(2)
    },
    backArrow: {
        position: 'absolute',
        right: 0,
        marginRight: PixelRatio.getPixelSizeForLayoutSize(4),
    },
    lineDelimiter: {
        height: PixelRatio.getPixelSizeForLayoutSize(0.5),
        backgroundColor: '#c5c2c2'
    },
    options: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    simpleView: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    simpleText: {
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.3),
    },
    dialogStyle: {
        margin: PixelRatio.getPixelSizeForLayoutSize(5)
    },
    selector: {
        width: PixelRatio.getPixelSizeForLayoutSize(4),
        height: PixelRatio.getPixelSizeForLayoutSize(4),
        borderRadius: PixelRatio.getPixelSizeForLayoutSize(20),
        backgroundColor: '#be7ce0',
        alignSelf: 'center'
    },
    upperBar: {
        height: PixelRatio.getPixelSizeForLayoutSize(9),
        width: PixelRatio.getPixelSizeForLayoutSize(0.5),
        backgroundColor: '#c5c2c2'
    },
    dialogCustom: {
        marginTop: -PixelRatio.getPixelSizeForLayoutSize(50),
        paddingRight: PixelRatio.getPixelSizeForLayoutSize(8),
        paddingLeft: PixelRatio.getPixelSizeForLayoutSize(8)
    }


});