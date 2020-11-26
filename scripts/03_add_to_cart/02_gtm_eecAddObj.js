// this function takes the raw Add To Cart JSON and converts it into a properly formatted Enhanced Ecommerce "add" object and the actionField 'list' if applicable
function(){
  
  
    // first check to make sure something didn't go wrong in the formation of this object
    if({{DL - SS Raw Add To Cart JSON}} == undefined){
          return undefined;    
    }

  
    // the information about the item/variant that was added to the cart
    var itemId = {{DL - SS Raw Add To Cart JSON}}.itemDetails.itemId;
    var itemTitle = {{DL - SS Raw Add To Cart JSON}}.itemDetails.title;
    var variantDetails = {{DL - SS Raw Add To Cart JSON}}.itemDetails.chosenVariant;

    var quantityAdded = {{DL - SS Raw Add To Cart JSON}}.quantityAdded;
    var variantPrice = ( (!variantDetails.onSale) ? variantDetails.price : variantDetails.salePrice ) / 100;
    var subtotalAdded = quantityAdded * variantPrice;

    // create our properly formatted enhanced ecommerce add object
    var eecAddObj = {
      'ecommerce': {
        'add': {
          'products': [{
            'id': itemId,
            'name': itemTitle,
            'category': variantDetails.optionValues[0].value,
            //variant: 'xyz', // maybe use this for sku instead of dimension
            'brand': {{const - eec brand}},
            'price': variantPrice.toFixed(2),
            'quantity': quantityAdded,
            'dimension5': variantDetails.sku,
            'dimension6': (variantDetails.unlimited || variantDetails.qtyInStock > 0) ? 'In Stock' : 'Sold Out',
            'dimension7': (!variantDetails.onSale) ? 'Regular Price' : 'On Sale',
            'metric1': subtotalAdded,                       
          }]
        }
      }
    }

    // add the actionField with list key/value based on the referrer
    // this function will only add the list if the referrer was actualy one with a list
	  {{JS Utility - add list from referrer}}(eecAddObj, 'add', {{Referrer}});
    
    // return our properly formatted enhanced ecommerce detail event object
    return eecAddObj;

}