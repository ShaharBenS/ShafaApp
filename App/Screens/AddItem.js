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
    ScrollView,
    Dimensions
} from 'react-native';

let ASOSParser = require('../Controllers/URLParser/AsosParser');
let backButton = require('../icons/pngs/next_arrow.png');
let screenSize = Dimensions.get('window');
import {PickerField, TextField, ImagesField, BigTextField, LocationField} from "../Components/FormField";


let itemsController = require('../Controllers/ItemsContoller');

let categoriesLabelsAndValues;

let viewWidth = 0.8;
let initialState;

export default class AddItem extends Component<props>
{
    constructor(props)
    {
        super(props);
        initialState = {
            product: null, productStatus: '',
            selectedSize: '', price: -1, categoryID: 10, description: '', location: null,
        };
        /* ASOS is the default and the only supported company for now */
        this.state = Object.assign({textChanged: false,company: 'ASOS', linkOrID: '',},initialState);
        setInterval(() =>
        {
            if (this.state.textChanged)
            {
                this.state.textChanged = false;
                if (this.state.company === 'ASOS')
                {
                    ASOSParser.parseURL(this.state.linkOrID)
                        .then(res =>
                        {
                            let variantsSizes = res.variants.map(variant =>
                            {
                                return {value: variant.brandSize, label: variant.brandSize}
                            });
                            variantsSizes.unshift({label: 'בחר מידה', value: ''});
                            this.setState({
                                selectedSize: res.isOneSize ? 'One Size' : '',
                                product: {
                                    sizes: res.isOneSize ? [{label: 'גודל אחד', value: 'One Size'}] : variantsSizes
                                    ,
                                    name: res.name,
                                    manufacturer: res.brand.name,
                                    images: res.media.images.map(image => image.url),
                                    link: res.link,
                                    info: res.info
                                }, productStatus: ''
                            });
                        })
                        .catch(err =>
                        {
                            this.setState({product: null, productStatus: err});
                        });
                }
            }
        }, 1000);

        const {navigate} = this.props.navigation;

        categoriesLabelsAndValues = global.categories.map(cat =>
        {
            return {label: cat.namet, value: cat.id}
        });
        categoriesLabelsAndValues.unshift({label: 'בחר קטגוריה', value: '-1'});
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
                <ScrollView>
                    <View style={styles.propertiesView}>

                        <PickerField fieldName={'שם החברה'}
                                     labelsAndValues={[{label: 'אסוס', value: 'ASOS'}]}
                                     valueChangedCallback={(itemValue) =>
                                     {
                                         _this.state.company = itemValue;
                                         _this.setState(initialState);
                                         _this.textChanged = true;
                                     }}/>
                        <TextField
                            maxLength={250}
                                fieldName={'לינק / קוד פריט'}
                                   textChangedCallback={text =>
                                   {
                                       _this.state.linkOrID = text;
                                       _this.setState(initialState);
                                       _this.state.textChanged = true;
                                   }}/>
                        <Text style={styles.productStatus}>{this.state.productStatus}</Text>

                        {this.state.product == null ? [] :
                            [
                                <ImagesField images={this.state.product.images}/>,
                                <PickerField
                                    fieldName={'מידה'}
                                    labelsAndValues={this.state.product.sizes}
                                    valueChangedCallback={itemValue =>
                                    {
                                        this.state.selectedSize = itemValue
                                    }}/>,
                                <PickerField fieldName={'קטגוריה'} labelsAndValues={categoriesLabelsAndValues}
                                             valueChangedCallback={itemValue =>
                                             {
                                                 this.state.categoryID = itemValue
                                             }}/>,
                                <TextField maxLength={10}
                                        keyboardType={'numeric'} fieldName={'מחיר'}
                                           textChangedCallback={text =>
                                {
                                    if (!isNaN(text))
                                    {
                                        _this.state.price = text;
                                    }
                                }}/>
                                ,
                                <BigTextField fieldName={'תיאור'}
                                              initialText={'ספרי על המוצר (אופציונלני).\nלמה קנית? למה מכרת? איך לדעתך הפריט?'}
                                              textChangedCallback={(text) =>
                                              {
                                                  this.state.description = text
                                              }}
                                              width={viewWidth * screenSize.width}
                                              height={screenSize.height*0.12}
                                              numberOfLines={5}
                                                maxLength={50}/>,
                                <LocationField fieldName={'מיקום פריט'}
                                               suggestionsWidth={viewWidth*screenSize.width}
                                               locationFoundCallback={(loc)=>{
                                                   this.state.location = loc;
                                               }} />,
                                <TouchableHighlight onPress={() =>
                                {
                                    if (this.state.price < 0)
                                    {
                                        Alert.alert("מחיר לא תקין")
                                    }
                                    else if (this.state.categoryID < 0)
                                    {
                                        Alert.alert("בחר קטגוריה")
                                    }
                                    else if (this.state.location == null)
                                    {
                                        Alert.alert("בחר מיקום")
                                    }
                                    else
                                    {
                                        let product = this.state.product;
                                        let item = {
                                            condition: 'new',
                                            name: product.name,
                                            categoryID: this.state.categoryID,
                                            size: this.state.selectedSize,
                                            owner: global.user._id,
                                            location: [this.state.location.lat, this.state.location.lng],
                                            price: this.state.price,
                                            manufacturer: product.manufacturer,
                                            images: product.images,
                                            link: product.link,
                                            productInfo:product.info,
                                            description:this.state.description
                                        };
                                        itemsController.addItem(item).then(() =>
                                        {
                                            Alert.alert("הפריט נוסף בהצלחה!");
                                            this.setState(initialState);
                                            navigate('Profile')
                                        }).catch((err) =>
                                        {
                                            Alert.alert('שגיאה!', err)
                                        })
                                    }
                                }}
                                                    underlayColor='#F2A4FA' style={styles.postButton}>
                                    <Text style={styles.postText}>
                                        פרסמי למכירה
                                    </Text>
                                </TouchableHighlight>
                                , <View style={{height: screenSize.height * 0.13}}/>
                            ]}


                    </View>
                </ScrollView>
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
        width: screenSize.width * viewWidth,
        marginLeft: screenSize.width * (1 - viewWidth) / 2
    }
    ,
    textStyle: {
        fontSize: 25,
        fontFamily: 'OpenSansHebrew-Regular',
        color: '#4a4a4a'
    },
    productStatus: {
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