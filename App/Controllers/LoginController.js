import {Platform} from 'react-native'
let packageJSON = require('../../package.json');
const serverAddress = packageJSON.proxy;

exports.getUser = function (data)
{
    return fetch(serverAddress + 'getUser/' + data.credentials.userId).then(response =>
    {
        return response.json().then(data =>
        {
            return new Promise((res, rej) =>
            {
                if (data.output === 'SUCCESS')
                {
                    res(data.user);
                }
                else
                {
                    rej(data.reason);
                }
            });
        })
    });
};
exports.addUser = function (data)
{
    return fetch(serverAddress + 'addUser',
        {
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
        }).then(response =>
    {
        return response.json().then(data =>
        {
            return new Promise((res, rej) =>
            {
                if (data.output === 'SUCCESS')
                {
                    res(data.user);
                }
                else
                {
                    rej(data.reason);
                }
            });
        })
    });
    ;
};