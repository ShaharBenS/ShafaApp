let packageJSON = require('../../package.json');
const serverAddress = packageJSON.proxy;

exports._likeItem = (item_id,likeOrDislike)=>{
    return fetch(serverAddress + 'likeItem',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id:global.user._id,
                item_id:item_id,
                likeOrDislike: likeOrDislike,
            })
        }).then(response=>{
        return response.json().then(data=>{
            return new Promise((res,rej)=>{
                if(data.output === 'SUCCESS')
                {
                    res(data.likes);
                }else{
                    rej(data.reason)
                }
            })
        })
    })
};

exports.likeItem = (item_id)=>{
    return exports._likeItem(item_id,true)
};

exports.unlikeItem = (item_id)=>{
    return exports._likeItem(item_id,false)
};