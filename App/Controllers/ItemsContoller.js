import {Platform} from "react-native";

let packageJSON = require('../../package.json');
const serverAddress = packageJSON.proxy;

exports.addItem = item =>
{
    return fetch(serverAddress + 'addItem',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item)
        }).then(res => res.json().then((data) =>
    {
        return new Promise((res,rej)=>{
            if (data.output === 'SUCCESS')
            {
                res();
            }
            else
            {
                rej('ההוספה נכשלה')
            }
        });
    }));
};

exports.getItem = id =>
{
    return fetch(serverAddress + 'getItem/' + id).then(response =>
    {
        return response.json().then(data =>
        {
            return new Promise((res, rej) =>
            {
                if (data.output === 'SUCCESS')
                {
                    res(data.item);
                }
                else
                {
                    rej(data.reason);
                }
            })
        })
    })
};

exports.getItems = (category, preference, from, howMany, location) =>
{
    return fetch(serverAddress + 'getItems?categoryID=' + category + '&preference=' + preference +
        '&from=' + from + '&howMany=' + howMany +
        (location === undefined ? '' : '&location=' + location))
        .then(response =>
        {
            return response.json().then(data =>
            {
                return new Promise ((res, rej) =>
                {
                    if (data.output === 'SUCCESS')
                    {
                        res(data.items);
                    }
                    else
                    {
                        rej(data.reason);
                    }
                })
            })
        })
};
