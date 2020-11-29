// this function takes the raw Modify Cart JSON "initialCartItemsJSON" or "newCartItemsJSON" and turns it into an eecCheckout Action object
function(){
  
    var ssModifyCartJSON = {{DL - SS Raw Modify Cart JSON}};
    var currentCartItemsJSON;

    // first check to make sure something didn't go wrong in the formation of this object
    if(ssModifyCartJSON == undefined){
        return undefined;    
    }
    else if(ssModifyCartJSON.initialCartItemsJSON){
        currentCartItemsJSON = ssModifyCartJSON.initialCartItemsJSON;
    }
    else{
        currentCartItemsJSON = ssModifyCartJSON.newCartItemsJSON;
    }

    var eecProductList = [];

    var sku, productJSON, quantityInCart, eecProduct;

    for(sku in currentCartItemsJSON){
        productJSON = currentCartItemsJSON[sku].productJSON;
        quantityInCart = currentCartItemsJSON[sku].quantityInCart;

        eecProduct = {{JS Utility - create eecObjectFromAction}}("eecProduct", productJSON, quantityInCart);

        eecProductList.push(eecProduct);
    }


    var eecCheckoutObj = {
        'ecommerce': {
            'checkout': {
              'actionField': {
                'step': 1
              },
              'products': eecProductList
            }
        }
    }

    return eecCheckoutObj;
}
