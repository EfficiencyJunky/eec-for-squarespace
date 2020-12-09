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

    // update the dataLayer variable we will use for our checkout tag
    updateCartTagDLVars(currentCartItemsJSON.productJSONList, currentCartItemsJSON.quantityList);

    // return our finished object
    return eecCheckoutObj;


    // This helper function calculates a few bits of aggregate information about our cart and stores them in a dataLayer variable we will use to send this information in our checkout tag
    // the count of unique products
    // the total count products
    // the total value of the cart
    function updateCartTagDLVars(productJSONList, quantityList){

        var uniqueProductCount = 0, totalProductCount = 0, totalValue = 0;

        for(var j=0; j < productJSONList.length; j++){
            totalProductCount = totalProductCount + quantityList[j];
            uniqueProductCount = uniqueProductCount + 1;
            totalValue = totalValue + (productJSONList[j].variants[0].price * quantityList[j]);
        }

        var checkoutTagInfo = {
            'uniqueProductCount': uniqueProductCount,
            'totalProductCount': totalProductCount,
            'totalValue': totalValue.toFixed(2)
        }
    
        {{JS Utility - setDataLayerVariable}}('checkoutTagInfo', checkoutTagInfo);

    }
}
