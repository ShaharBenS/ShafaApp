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


import {GalleyItem} from '../Components/GalleyItem';
import {SelectorItem} from '../Components/SelectorItem';

let itemsController = require('../Controllers/ItemsContoller');
let maxChunksParallel = 50;
let itemsPerChunk = 50;

let textArray = ["הכי קרוב אלי", "מהזול ליקר", "מהיקר לזול", "החדש ביותר"];

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

        this.changeSort(-1,0);

    }

    changeSort(index,chunkNumber)
    {
        let sortStrategy = null;
        switch(index){
            case 0:
                sortStrategy = 'closest';
                break;
            case 1:
                sortStrategy = 'cheapest';
                break;
            case 2:
                sortStrategy = 'expansive';
                break;
            case 3:
                sortStrategy = 'newest';
                break;
            default:
                sortStrategy = 'random';
                break;
        }
        itemsController.getItems(global.currentCategoryID, sortStrategy, chunkNumber, itemsPerChunk)
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
                                                  this.changeSort(i,0);
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

                    <View
                        style={{
                            height: 30,
                            width: 1,
                            backgroundColor: '#c5c2c2'
                        }}
                    />

                    <TouchableOpacity style={styles.simpleView} onPress={() =>
                    {
                        this.popupDialog.show();
                    }}>
                        <Text style={styles.simpleText}>מיון</Text>

                    </TouchableOpacity>


                </View>
                <PopupDialog dialogStyle={{marginTop: -200, paddingRight: 30, paddingLeft: 30}}
                             width={0.8} height={270} ref={(popupDialog) =>
                {
                    this.popupDialog = popupDialog;
                }}>
                    <View style={{flex: 1}}>
                        {selectorsArray}

                    </View>
                </PopupDialog>

                <View style={styles.lineDelimiter}/>

                <FlatList
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

/*
        numColumns={2}
        data={items}
        renderItem={(item) => <GalleyItem item={item}/>}
        keyExtractor={item => item._id}
 */


const percentHeight = 0.1;
const window = Dimensions.get('window');
const renderedHeight = percentHeight * window.height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: 24,
        height: 24,
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
        fontSize: 25,
        fontFamily: 'OpenSansHebrewCondensed-Regular',
        color: '#4a4a4a',
        margin: 10
    },
    backArrow: {
        position: 'absolute',
        right: 0,
        marginRight: 15,
    },
    lineDelimiter: {
        height: 1,
        backgroundColor: '#c5c2c2'
    },
    options: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    simpleView: {flex: 1, alignSelf: 'stretch', justifyContent: 'center'},
    simpleText: {
        alignSelf: 'center',
        fontFamily: 'OpenSansHebrewCondensed-Regular',
        fontSize: 20,
    },
    dialogStyle: {
        margin: 20
    },
    selector: {
        width: 15,
        height: 15,
        borderRadius: 30,
        backgroundColor: '#be7ce0',
        alignSelf: 'center'
    }


});