import React, {Component} from 'react';
import {
    Text,
    Image,
    StyleSheet,
    View,
    TouchableHighlight,
    Alert,
    FlatList,
    Picker,
    Dimensions
} from 'react-native';

let ASOSParser = require('../Controllers/URLParser/AsosParser');
let backButton = require('../icons/pngs/next_arrow.png');
let screenSize = Dimensions.get('window');
import {PickerField, TextField,ImagesField} from "../Components/FormField";



/*
{this.props.labelsAndValues.map((labelAndValue) => {
                    return (<Picker.Item label={labelAndValue.label} value = {labelAndValue.value} />)
            })}
 */
export default class AddItem extends Component<props>
{
    constructor(props)
    {
        super(props);
        this.state = {company: 'ASOS', linkOrID: '',
            product: null, productStatus: '',textChanged:false,selectedSize:'',price:0};
        setInterval(()=>{
            if(this.state.textChanged)
            {
                this.state.textChanged = false;
                if (this.state.company === 'ASOS')
                {
                    ASOSParser.parseURL(this.state.linkOrID)
                        .then(res =>
                        {
                            this.setState({product: {images:res.media.images,
                                sizes:res.variants.map(variant=>
                                            {return {value:variant.brandSize,label:variant.brandSize}})}, productStatus: ''});
                        })
                        .catch(err =>
                        {
                            this.setState({product: null, productStatus: err});
                        });
                }
            }
            },1000)
    }


    static navigationOptions = {
        tabBarIcon: () => <Image source={require('../icons/pngs/categories_icon_gry.png')}
                                 style={{width: 24, height: 24, resizeMode: 'cover'}}/>

    };

    render()
    {
        let _this = this;
        return (
            <View>
                <View style={styles.headerContainer}>
                    <TouchableHighlight onPress={() =>
                    {
                        Alert.alert("LOL")
                    }} style={styles.backArrow} underlayColor='grey'>
                        <Image source={backButton}/>
                    </TouchableHighlight>
                    <Text style={styles.textStyle}>מוצר חדש</Text>
                </View>
                <View style={styles.propertiesView}>

                    <PickerField fieldName={'שם החברה'}
                                 labelsAndValues={[{label: 'אסוס', value: 'ASOS'}]}
                                 valueChangedCallback={(itemValue) =>
                                 {
                                     _this.state.company = itemValue;
                                     _this.textChanged = true;
                                 }}/>
                    <TextField fieldName={'לינק / קוד פריט'}
                               textChangedCallback={text =>
                               {
                                   _this.state.linkOrID = text;
                                   _this.state.textChanged = true;
                               }}/>
                    <Text style={styles.productStatus}>{this.state.productStatus}</Text>


                    {this.state.product == null ? [] :
                        [
                            <ImagesField images={this.state.product.images}/>,
                            <PickerField
                                fieldName={'מידה'}
                                            labelsAndValues={this.state.product.sizes}
                                         valueChangedCallback = {itemValue=>{this.state.selectedSize = itemValue}} />,
                            <TextField keyboardType={'numeric'} fieldName={'מחיר'} textChangedCallback={text =>
                            {
                                if(!isNaN(text))
                                {
                                    _this.state.price = text;
                                }
                            }}/>,
                            <PickerField fieldName={'קטגוריה'}/>,
                            <TouchableHighlight onPress={() =>
                        {

                        }}
                                            underlayColor='#F2A4FA' style={styles.postButton}>
                            <Text style={styles.postText}>
                                פרסמי למכירה
                            </Text>
                        </TouchableHighlight>]}
                </View>
            </View>)
    }
}


let styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    propertiesView: {
        //marginTop: screenSize.height * 0.06,
        width: screenSize.width * 0.8,
        marginLeft: screenSize.width * 0.1
    }
    ,
    textStyle: {
        fontSize: 25,
        fontFamily: 'OpenSansHebrew-Regular',
        color: '#4a4a4a'
    },
    productStatus:{
        fontSize: 18,
        fontFamily: 'OpenSansHebrew-Regular',
        color: '#4a4a4a'
    },
    backArrow: {
        paddingTop: 10,
        position: 'absolute',
        right: 0,
        marginRight: 15,
    },
    postButton: {
        marginTop: screenSize.height * 0.089968,
        height: screenSize.height * 0.0643274,
        width: screenSize.width * 0.7064,
        marginLeft: 0.0468 / 2 * screenSize.height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#be7ce0'
    },
    postText: {
        fontFamily: 'OpenSansHebrew-Regular',
        fontSize: 15,
        color: '#fff'
    }
});