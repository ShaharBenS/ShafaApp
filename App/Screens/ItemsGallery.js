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
    Alert, PixelRatio,

} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import {GalleyItem} from '../Components/GalleyItem';
import {SelectorItem} from '../Components/SelectorItem';
import { StackNavigator } from 'react-navigation';
import Filter from "./Filter";


const itemsController = require('../Controllers/ItemsContoller');
const maxChunksParallel = 50;
const itemsPerChunk = 50;
const dialogHeight = PixelRatio.getPixelSizeForLayoutSize(75);
const textArray = ["הכי קרוב אלי", "מהזול ליקר", "מהיקר לזול", "החדש ביותר"];



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
        let location = undefined;
        let sortStrategy = null;
        switch(index){
            case 0:
                sortStrategy = 'closest';
                location = [global.currentLocation.lng,global.currentLocation.lat];
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
        itemsController.getItems(global.currentCategoryID, sortStrategy, chunkNumber, itemsPerChunk,
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
                    <TouchableOpacity style={styles.simpleView} onPress={()=> navigate('Filter')}>
                        <Text style={styles.simpleText}>סינון</Text>
                    </TouchableOpacity>

                    <View style={styles.upperBar} />

                    <TouchableOpacity style={styles.simpleView} onPress={() => {
                        this.popupDialog.show();
                    }}>
                        <Text style={styles.simpleText}>מיון</Text>

                    </TouchableOpacity>


                </View>
                <PopupDialog dialogStyle={styles.dialogCustom}
                             width={0.8} height={dialogHeight} ref={(popupDialog) => {
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