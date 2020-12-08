// this function takes the raw Modify Cart JSON "initialCartItemsList" or "newCartItemsList" and turns it into an eecCheckout Action object
// then adds the actionField with value set to {'step': 1} because we only know when the customer entered the cart at which point we lose visibility into their actions because SS doesn't allow access to the checkout process
function(){
  
    // grab a reference
    var ssModifyCartObject = {{DL - SS Raw Modify Cart}};
    var currentCartItemsList;

    // first check to make sure something didn't go wrong in the formation of this object
    if(ssModifyCartObject == undefined){
        return undefined;
    }
    // if the "initialCartItemsList" object exists then we must have just initialized the cart
    else if(ssModifyCartObject.initialCartItemsList){
        currentCartItemsList = ssModifyCartObject.initialCartItemsList;
    }
    // otherwise use the "newCartItemsList", which means the cart has been modified
    else{
        currentCartItemsList = ssModifyCartObject.newCartItemsList;
    }

    // convert the rawCartItemsList into an object with a list of productJSONs and a list of quantities
    var currentCartItemsJSON = {{JS Utility - convertRawCartItemsListToProductJsonCollection}}( currentCartItemsList, 'cartItemsLists');

    // create our base level eecCheckout object with the products list
    var eecCheckoutObj = {{JS Utility - createEecObjectFromAction}}('checkout', currentCartItemsJSON.productJSONList, currentCartItemsJSON.quantityList);

    // add the appropriate actionField object to indicate step 1 of checkout
    eecCheckoutObj.ecommerce.checkout['actionField'] = {'step': 1};

    // return our finished object
    return eecCheckoutObj;
}
