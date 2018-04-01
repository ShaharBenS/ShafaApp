import {Dimensions} from "react-native";

const window = Dimensions.get('window');
const vw = window.width;
const vh = window.height;
const divide = Math.max(vh / vw, vw / vh);


export var minUnit = window.width > window.height ? window.height : window.width;

export function vs(units)
{
    return units * divide;
}