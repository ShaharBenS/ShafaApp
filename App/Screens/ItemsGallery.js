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

} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import {vs, minUnit} from '../Controllers/global';
import {GalleyItem} from '../Components/GalleyItem';
import {SelectorItem} from '../Components/SelectorItem';

let itemsController = require('../Controllers/ItemsContoller');
let maxChunksParallel = 50;
let itemsPerChunk = 8;

let textArray = ["הכי קרוב אלי", "מהזול ליקר", "מהיקר לזול", "החדש ביותר"];
let currentChunk = 0;
let selectedIndexToName = (index) =>
{
    switch (index)
    {
        case 0:
            return 'closest';
        case 1:
            return 'cheapest';
        case 2:
            return 'expansive';
        case 3:
            return 'newest';
        default:
            return 'random';
    }
};
export default class ItemsGallery extends Component<Props>
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
            selectedIndex: 2,
            disableArray: [true, false, true, true],
            items: []
        };

        this.changeSort(-1);

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
                    <TouchableOpacity style={styles.simpleView}>
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
                        currentChunk++;
                        let preference = selectedIndexToName(this.state.selectedIndex);
                        itemsController.getItems(global.currentCategoryID, preference,
                            currentChunk * itemsPerChunk, itemsPerChunk, preference === 'closest' ?
                                [global.currentLocation.lng, global.currentLocation.lat]
                                : undefined).then(items =>{
                            this.setState(previousState =>
                            {
                                return {items: [...previousState.items, ...items]}
                            })}).catch(err =>
                            {
                                Alert.alert("שגיאה", JSON.stringify(err))
                            });
                    }}
                    onEndReachedThreshold={0.9}
                    numColumns={2}
                    data={this.state.items}
                    renderItem={(item) =>
                    {
                        return <GalleyItem item={item.item}/>
                    }}
                    keyExtractor={(items, index) => index}
                />


            </View>
        );
    }


};

const percentHeight = 0.1;
const window = Dimensions.get('window');
const renderedHeight = percentHeight * window.height;
const dialogHeight = vs(150);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: vs(13),
        height: vs(13),
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
        fontSize: vs(13),
        fontFamily: 'OpenSansHebrew-Regular',
        color: '#4a4a4a',
        margin: vs(5)
    },
    backArrow: {
        position: 'absolute',
        right: 0,
        marginRight: vs(8),
    },
    lineDelimiter: {
        height: vs(1),
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
        fontSize: vs(11),
    },
    dialogStyle: {
        margin: vs(11)
    },
    selector: {
        width: vs(8),
        height: vs(8),
        borderRadius: vs(16),
        backgroundColor: '#be7ce0',
        alignSelf: 'center'
    },
    upperBar: {
        height: vs(16),
        width: vs(1),
        backgroundColor: '#c5c2c2'
    },
    dialogCustom: {
        marginTop: -vs(110),
        paddingRight: vs(16),
        paddingLeft: vs(16)
    }


});