import {Dimensions} from "react-native";

const window = Dimensions.get('window');
const vw = window.width / 100;
const vh = window.height / 100;
const divide = vh/vw;
export var minUnit = window.width>window.height? window.height : window.width;
export function vs(units){
    return units * (divide < 1 ? 1/divide : divide);
}