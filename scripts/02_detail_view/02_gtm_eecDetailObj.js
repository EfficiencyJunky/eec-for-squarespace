// this function takes the rawProductDetailJSON and converts it into a properly formatted object with a single "detail" key that Google Tag Manager can use to generate an Enhanced Ecommerce event for the Product Detail View
function(){
  
    var rawProductDetailJSON = {{DL - SS Raw Product Detail JSON}};  

      // first check to make sure something didn't go wrong in the formation of this object
      if(rawProductDetailJSON == undefined){
          return undefined;    
    }
  
    // pull out the relevant elements from the object
    var itemDetails = ssRawProductDetailJSON.item;
    var variantDetails = ssRawProductDetailJSON.product.variants[0];

    // create our properly formatted enhanced ecommerce detail view object
    var eecDetailObj = {
      'ecommerce': {
        'detail': {
          'products': [{
            'id': itemDetails.id,
            'name': itemDetails.title,
            'category': variantDetails.attributes.category,
            //variant: 'xyz', // maybe use this for sku instead of dimension
            'brand': {{const - eec brand}},
            'dimension5': variantDetails.sku,
            'dimension6': (variantDetails.stock.unlimited || variantDetails.stock.quantity > 0) ? 'In Stock' : 'Sold Out',
            'dimension7': (!variantDetails.onSale) ? 'Regular Price' : 'On Sale',
          }]
        }
      }
    }

    
    // add the actionField with list key/value based on the referrer
    // this function will only add the list if the referrer was actualy one with a list
    {{JS Utility - add list from referrer}}(eecDetailObj, 'detail', {{Referrer}});        
    
    
    // return our properly formatted enhanced ecommerce detail event object
    return eecDetailObj;
}