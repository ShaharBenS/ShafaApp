import React,{Component} from 'react';
import {
    Text,
    View,
    Alert,
    Picker,
    Dimensions,
    StyleSheet,
    TextInput,
    FlatList,
    Image
} from 'react-native';

let screenSize = Dimensions.get('window');

export class PickerField extends Component<props>
{
    constructor(props){
        super(props);
        this.state = {selected:props.labelsAndValues[0].value};
    }

    render()
    {
        return (
            <View>
                <Text style={styles.textStyle}>{this.props.fieldName}</Text>
                <View style={styles.pickerView}>
                    <Picker selectedValue={this.state.selected}
                            onValueChange={(itemValue,itemIndex)=>{
                                this.setState({selected:itemValue});
                                this.props.valueChangedCallback(itemValue,itemIndex);
                            }}>

                        {this.props.labelsAndValues.map((labelAndValue, index) =>
                            <Picker.Item
                                key={index}
                                label={labelAndValue.label}
                                value={labelAndValue.value}/>)}

                    </Picker>
                </View>
            </View>);
    }
}
export class TextField extends Component{
    render(){
        return (
        <View>
            <Text style={styles.textStyle}>{this.props.fieldName}</Text>
                <TextInput keyboardType={this.props.keyboardType ? this.props.keyboardType:'default'} style = {styles.textInput}
                           onChangeText={this.props.textChangedCallback}
                        />
        </View>);
    }
}

export class ImagesField extends Component{


    render(){
        return (
            <View>
                <FlatList contentContainerStyle={styles.imagesContainerStyle} keyExtractor={(image,index)=>index} horizontal = {true}
                          data={this.props.images} renderItem={(image) =>{
                    return <Image resizeMode={'contain'} style={styles.imageStyle} source={{uri: 'https://'+image.item}}/>;}} />
            </View>
                )
    }
}

let styles = StyleSheet.create({
    textStyle: {
        fontSize: 17,
        fontFamily: 'OpenSansHebrew-Light',
        color: '#747474',
        paddingBottom:5,
        paddingTop:screenSize.height * 0.04,
    },
    pickerView: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    imagesContainerStyle:{
        //height:screenSize.height*0.2,
    },
    imageStyle:{
        flex:1,
        height:screenSize.height*0.2,
        width:screenSize.width*0.3,

    }
});