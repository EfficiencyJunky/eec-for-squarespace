// this function takes the raw Modify Cart JSON, compares the old and new cart state, identifies what was added/removed and generates a properly formatted Enhanced Ecommerce "add" or "remove" object accordingly.
// it also sets the values of the 'modifyCartTagInfo' dataLayer object to be used in our Tag later
function(){

    // grab a reference to the dataLayer variable
    var ssRawModifyCart = {{DL - SS Raw Modify Cart}};
    // first check to make sure something didn't go wrong in the formation of this object
    // or to see if it is the initial state of the cart on page load
    // if either of these is true, return undefined
    if( ssRawModifyCart == undefined || typeof(ssRawModifyCart.initialCartItemsList) != "undefined" ){
        //console.log("no cart available OR initial cart instance");
        return undefined;
    }

    // extract the old and new cart objects
    var oldCartItemsJSON = {{JS Utility - convertRawCartItemsListToProductJsonCollection}}( ssRawModifyCart.oldCartItemsList );
    var newCartItemsJSON = {{JS Utility - convertRawCartItemsListToProductJsonCollection}}( ssRawModifyCart.newCartItemsList );


    // we'll reset these variables each time through the loop
    var sku, oldCartItem, newCartItem, eecAction, quantityDifference;

    // loop throught all the items in the old cart, check to see if any sku's are missing
    // and if none are missing find the item who's quantity changed
    // then create the appropriate eecAdd or eecRemove object
    for(sku in oldCartItemsJSON){
        
        //sku = oldCartItemsSKUs[j];
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

            var modifyCartTagInfo = {
                'action': eecAction,
                'quantity': quantityDifference,
                'productName': oldCartItem.productJSON.productName
            }

            {{JS Utility - setDataLayerVariable}}('modifyCartTagInfo', modifyCartTagInfo);

            return {{JS Utility - createEecObjectFromAction}}(eecAction, oldCartItem.productJSON, quantityDifference);
        }

    }

}