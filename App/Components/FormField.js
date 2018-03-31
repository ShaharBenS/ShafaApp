import React, {Component} from 'react';
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
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'

let screenSize = Dimensions.get('window');

export class PickerField extends Component<props>
{
    constructor(props)
    {
        super(props);
        this.state = {selected: props.labelsAndValues[0].value};
    }

    render()
    {
        return (
            <View>
                <Text style={styles.textStyle}>{this.props.fieldName}</Text>
                <View style={styles.pickerView}>
                    <Picker selectedValue={this.state.selected}
                            onValueChange={(itemValue, itemIndex) =>
                            {
                                this.setState({selected: itemValue});
                                this.props.valueChangedCallback(itemValue, itemIndex);
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

export class TextField extends Component
{
    render()
    {
        return (
            <View>
                <Text style={styles.textStyle}>{this.props.fieldName}</Text>
                <TextInput
                    underlineColorAndroid='#000000'
                    keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
                    style={styles.textInput}
                    onChangeText={this.props.textChangedCallback}
                    maxLength={this.props.maxLength}
                />
            </View>);
    }
}

export class BigTextField extends Component
{
    render()
    {
        return (
            <View>
                <Text style={styles.textStyle}>{this.props.fieldName}</Text>
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={[styles.bigText, {
                        maxHeight: this.props.height, minHeight: this.props.height,
                        minWidth: this.props.width, maxWidth: this.props.width
                    }]}
                    maxLength={this.props.maxLength} placeholder={this.props.initialText}
                    onChangeText={this.props.textChangedCallback}
                    multiline/>
            </View>)
    }
}

export class ImagesField extends Component
{


    render()
    {
        return (
            <View>
                <FlatList contentContainerStyle={styles.imagesContainerStyle} keyExtractor={(image, index) => index}
                          horizontal={true}
                          data={this.props.images} renderItem={(image) =>
                {
                    return <Image resizeMode={'contain'} style={styles.imageStyle}
                                  source={{uri: 'https://' + image.item}}/>;
                }}/>
            </View>
        )
    }
}

export class LocationField extends Component
{
    render()
    {
        return (
            <View>
                <Text style={styles.textStyle}>{this.props.fieldName}</Text>
                <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) =>
            { // 'details' is provided when fetchDetails = true
                this.props.locationFoundCallback(details.geometry.location);
            }}

            getDefaultValue={() => ''}

            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyBRLx2XwxXcGQAtnxnR_HK4olMtBldfLUE',
                language: 'he', // language of the results
                //types: '(cities)' // default: 'geocode'
            }}

            rowWidth = {this.props.suggestionsWidth }

            styles={{
                textInputContainer: {
                    width:'100%'
                },
                description: {
                    fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                }
            }}

            //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="מיקום נוכחי"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

            debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

        />
            </View>
                )
    }
}

let styles = StyleSheet.create({
    textStyle: {
        fontSize: 17,
        fontFamily: 'OpenSansHebrew-Light',
        color: '#747474',
        paddingBottom: 5,
        paddingTop: screenSize.height * 0.04,
    },
    pickerView: {
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    imagesContainerStyle: {
        //height:screenSize.height*0.2,
    },
    imageStyle: {
        flex: 1,
        height: screenSize.height * 0.2,
        width: screenSize.width * 0.3,
    },
    bigText: {
        paddingRight: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        textAlignVertical: "top"
    }
});