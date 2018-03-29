let URL = require('url-parse');
let path = require('react-native-path');

let parseByProductID = id => {
    return fetch('http://api.asos.com/product/catalogue/v2/products/'+id+'?store=COM&lang=en-GB&sizeSchema=EU&currency=EUR')
        .then(response=>{
            return response.json().then(data=>{
                return data;
            }).catch(err=>{
                console.log(err);
                return -1;
            })
        }).catch(err=>{
            console.log(err);
            return -1;
        })

};

exports.parseURL = (link) => {
  if(isNaN(link))
  { //HTTP URL
        let url = new URL(link,true);
        let productID = path.basename(url.pathname);
        return parseByProductID(productID);
  }
  else
  { //Code Number
      let codeNumber = parseInt(link,10);
      return fetch('https://api.asos.com/product/search/v1/?q='+codeNumber+'&store=1&lang=en-GB&sizeschema=EU&currency=EUR&sort=freshness&channel=mobile-app&offset=0&limit=100')
          .then(response=>{
              return response.json().then(data=>{
                    return data.products.length > 0 ?
                        parseByProductID(data.products[0]).id : -1;

              }).catch(err=>{
                  console.log(err);
                  return -1;
              });
          }).catch(err=>{
              console.log(err);
              return -1;
      })
  }
};

exports.parseURL("1259181");