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

} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';


import {GalleyItem} from '../Components/GalleyItem';
import {SelectorItem} from '../Components/SelectorItem';


export default class ItemsGallery extends Component<Props> {

    static navigationOptions = {
        labelStyle: {display: 'none'},
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>
    };

    constructor(props) {
        super(props);
        this.state = {  selectedIndex: 2,
                        disableArray: [true, false, true, true] };
    }

    render() {
        let data = [{id: '1'}, {id: '2'}, {id: '3'}, {id: '4'}, {id: '5'}, {id: '6'}];

        let textArray = ["הכי קרוב אלי","מהזול ליקר","מהיקר לזול","החדש ביותר"];
        let selectorsArray = [];
        for(let i=0; i<textArray.length; i++)
        {
            selectorsArray.push(<SelectorItem textToDisplay={textArray[i]} disableDot={this.state.disableArray[i]}
                                              onPress={()=> {
                                                  let disables = this.state.disableArray;
                                                  for(let j=0; j<textArray.length; j++)
                                                      disables[j] = j !== i;
                                                  this.setState({selectedIndex: i, disableArray: disables});
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

                    <TouchableOpacity style={styles.simpleView} onPress={() => {
                        this.popupDialog.show();
                    }}>
                        <Text style={styles.simpleText}>מיון</Text>

                    </TouchableOpacity>


                </View>
                <PopupDialog dialogStyle={{marginTop: -200, paddingRight: 30, paddingLeft: 30}}
                             width={0.8} height={270} ref={(popupDialog) => {
                    this.popupDialog = popupDialog;
                }}>
                    <View style={{flex: 1}}>
                        {selectorsArray}

                    </View>
                </PopupDialog>

                <View style={styles.lineDelimiter}/>

                <FlatList
                    numColumns={2}
                    data={data}
                    renderItem={({item}) => <GalleyItem/>}
                    keyExtractor={item => item.id}

                />

            </View>
        );
    }


};

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