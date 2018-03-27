import {Platform} from 'react-native'
let packageJSON = require('../../package.json');

const serverAddress = "http://132.72.238.94:3000/";
exports.getUser = function (data)
{
    return fetch(serverAddress + 'getUser' + data.credentials.userId);
};
exports.addUser = function (data)
{
    return fetch(serverAddress + 'addUser', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userFacebookID: data.profile.id,
            name: {
                firstName: data.profile.first_name,
                lastName: data.profile.last_name
            },
            os: Platform.OS,
            language: data.profile.locale === 'he_IL' ? 'Hebrew' : 'English',
            facebookToken: {
                token: data.credentials.token,
                tokenExpirationDate: data.credentials.tokenExpirationDate
            },
            version: packageJSON.version,
        })
    });
};