
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



export default class SelectMeasure extends Component<Props> {

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
    </View>
);}