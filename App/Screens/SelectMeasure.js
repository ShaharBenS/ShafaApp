import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    PixelRatio,

} from 'react-native';
import {ChecklistItem} from "../Components/ChecklistItem";


export default class SelectMeasure extends Component<Props> {

    static navigationOptions = {
        labelStyle: {display: 'none'},
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')} style={styles.icon}/>
    };

    textArray = [];

    initCheckArray() {
        let checkArray = [];
        for (let i = 0; i < this.textArray.length; i++) {
            checkArray.push(false);
        }
        checkArray[3] = true; //DEFAULT LARGE CHECKED
        this.updateGlobal(checkArray[3], 3);
        return checkArray;
    }

    constructor(props) {
        super(props);
        this.state = {checkArray: this.initCheckArray()};
        this.textArray = [
            "XS", "S", "M", "L", "XL", "XXL",
            "34", "36", "38", "40", "42", "44",
            "0", "1", "2", "3", "4", "5",
            "One Size"
        ];
    }

    allWith(value) {
        let checks = this.state.checkArray;
        for (let i = 0; i < this.textArray.length; i++) {
            checks[i] = value;
            this.updateGlobal(value, i);
        }
        this.setState({checkArray: checks});
    }

    updateGlobal(value, index){
        if(value)
            global.sizes.push(this.textArray[index]);
        else
            global.sizes.splice(global.sizes.indexOf(this.textArray[index]),1);
    }

    render() {
        let selectorsArray = [];
        for (let i = 0; i < this.textArray.length; i++) {
            selectorsArray.push(<ChecklistItem textToDisplay={this.textArray[i]} checked={this.state.checkArray[i]}
                                               onPress={() => {
                                                   let checks = this.state.checkArray;
                                                   checks[i] = !checks[i];
                                                   this.updateGlobal(checks[i], i);
                                                   this.setState({checkArray: checks});
                                               }
                                               }/>)
        }
        return (

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.categoryName}>מידה</Text>
                    <Image style={styles.backArrow} source={require('../icons/pngs/next_arrow.png')}/>
                </View>
                <View style={styles.lineDelimiter}/>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.simpleView} onPress={() => this.allWith(false)}>
                        <Text style={styles.simpleText}>נקה</Text>
                    </TouchableOpacity>

                    <View style={styles.upperBar}/>

                    <TouchableOpacity style={styles.simpleView} onPress={() => this.allWith(true)}>
                        <Text style={styles.simpleText}>בחר הכל</Text>

                    </TouchableOpacity>


                </View>

                <View style={styles.lineDelimiter}/>

                <FlatList
                    data={selectorsArray}
                    renderItem={({item}) => item}
                    keyExtractor={item => item.id}

                />

            </View>
        );
    }


}

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
        margin: PixelRatio.getPixelSizeForLayoutSize(7)
    },
    backArrow: {
        position: 'absolute',
        right: 0,
        marginRight: PixelRatio.getPixelSizeForLayoutSize(6),
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
    upperBar: {
        height: PixelRatio.getPixelSizeForLayoutSize(9),
        width: PixelRatio.getPixelSizeForLayoutSize(0.5),
        backgroundColor: '#c5c2c2'
    },
});