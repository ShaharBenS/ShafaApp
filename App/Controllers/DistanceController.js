let earthRadius = 6371;

exports.distance = (from, to) =>
{
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
