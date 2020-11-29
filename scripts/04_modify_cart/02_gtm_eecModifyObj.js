// this function takes the raw Modify Cart JSON, compares the old and new cart state, identifies what was added/removed and generates a properly formatted Enhanced Ecommerce "add" or "remove" object accordingly
function(){
  
    // first check to make sure something didn't go wrong in the formation of this object
    // or to see if it is the initial state of the cart on page load
    // if either of these is true, return undefined
    if( {{DL - SS Raw Modify Cart JSON}} == undefined || typeof({{DL - SS Raw Modify Cart JSON}}.initialCartItemsJSON) != "undefined" ){
        //console.log("no cart available OR initial cart instance");
        return undefined;    
    }

    // extract the old and new cart objects
    var oldCartItemsJSON = {{DL - SS Raw Modify Cart JSON}}.oldCartItemsJSON;
    var newCartItemsJSON = {{DL - SS Raw Modify Cart JSON}}.newCartItemsJSON;

    // grab the keys from the oldCartItemsJSON. the keys correspond to the SKU of each item
    var oldCartItemsSKUs = Object.keys(oldCartItemsJSON);

    // we'll reset these variables each time through the loop
    var sku, oldCartItem, newCartItem, eecAction, quantityDifference;

    // loop through the keys from the old cart
    for(var j=0; j < oldCartItemsSKUs.length; j++){
        
        sku = oldCartItemsSKUs[j];
        oldCartItem = oldCartItemsJSON[sku];
        newCartItem = newCartItemsJSON[sku];

        // if the sku still exists in the new cart
        // compare the quantities for the sku in the old/new cart
        if(newCartItem){
            quantityDifference =    newCartItem.quantityInCart 
                                  - oldCartItem.quantityInCart;
        }
        // if the sku from the old cart doesn't exist in the new cart, it was removed completely
        else{            
            quantityDifference = -(oldCartItem.quantityInCart);
        }

        // if there was a difference in quantity, create the eecObj accordingly
        if(quantityDifference != 0){
            eecAction = (quantityDifference > 0 ) ? 'add' : 'remove'; 
            return {{JS Utility - create eecObjectFromAction}}(eecAction, oldCartItem.productJSON, quantityDifference);
        }

    }

}