import {Platform} from "react-native";

let packageJSON = require('../../package.json');
const serverAddress = packageJSON.proxy;

exports.addItem = item => {
    return fetch(serverAddress + 'addItem',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        });
};

exports.getItem = id =>{
    return fetch(serverAddress+'getItem'+id)
};

exports.getItems = (category,preference,from,howMany,facebookID)=>{
    //return fetch(serverAddress + 'getItems'+category+)
};