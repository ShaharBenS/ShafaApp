let earthRadius = 6371*1000;

exports.distance = (from, to) =>
{
    if(!(from.lat && from.lng && to.lat && to.lng))
    {
        return '';
    }
    let radians = (degress)=>{
        return degress * Math.PI / 180;
    };
    return  (earthRadius *
        Math.acos(Math.cos(radians(from.lat))
            * Math.cos(radians(to.lat))
            * Math.cos(radians(to.lng) - radians(from.lng))
            + Math.sin(radians(from.lat))
            * Math.sin(radians(to.lat))))
};


exports.metersToLabel = (distance)=>{
    if(distance < 1000){
        return {value:distance.toFixed(0),measurement:'m'};
    }
    else{
        return {value:(distance/1000).toFixed(1),measurement:'km'};
    }
};