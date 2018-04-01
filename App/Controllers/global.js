import {Dimensions} from "react-native";

const window = Dimensions.get('window');
const vw = window.width / 100;
const vh = window.height / 100;

export function vs(units){
    return units * (vh / vw);
}