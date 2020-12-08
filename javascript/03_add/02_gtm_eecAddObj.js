// this function takes the raw Add To Cart info and converts it into a properly formatted Enhanced Ecommerce "add" object and adds the actionField 'list' if applicable
function(){

  // grab a reference to the raw push
  var ssRawAddToCart = {{DL - SS Raw Add To Cart}};
  
  // first check to make sure something didn't go wrong in the formation of this object
  if(ssRawAddToCart == undefined){
        return undefined;    
  }

  // convert the raw "newlyAdded" object to a productJSON
  var productJSON = convertNewlyAddedtoProductJSON(ssRawAddToCart.newlyAdded);

  // update our "variantsAddedToCart" cookie with the information from the "productJSON"
  {{JS Utility - updateVariantsAddedToCartCookie}}(productJSON);

  // create our basic eec object of type "add"
  var eecAddObj = {{JS Utility - createEecObjectFromAction}}('add', productJSON, ssRawAddToCart.quantityAdded);

  // add the actionField with list key/value based on the referrer
  // this function will only add the list if the referrer was actualy one with a list
  {{JS Utility - addListFromReferrer}}(eecAddObj, 'add', {{Referrer}});
  
  
  // return our properly formatted enhanced ecommerce add event object
  return eecAddObj;


  // *********************************************************************************
  // This function does the work of converting the newlyAdded object to a productJSON
  // *********************************************************************************
  function convertNewlyAddedtoProductJSON(newlyAdded){
    var variantAdded = newlyAdded.chosenVariant;
    var variantPrice =  ( !variantAdded.onSale ? 
                          variantAdded.price : 
                          variantAdded.salePrice 
                        ) / 100;

    var productJSON = {
        'productId': newlyAdded.itemId,
        'productName': newlyAdded.title,
        // we may want to update this to retrieve category info from a cookie generated during product impressions
        'productCategory': {{DL - SS Raw Product Detail}}.category,
        'variants':
        [{
            'sku': variantAdded.sku,
            'price': variantPrice.toFixed(2),
            'unlimited': variantAdded.unlimited,
            'qtyInStock': variantAdded.qtyInStock, // can be 0 if unlimited is true
            'onSale': variantAdded.onSale
        }]
    };

    return productJSON;
  }



}