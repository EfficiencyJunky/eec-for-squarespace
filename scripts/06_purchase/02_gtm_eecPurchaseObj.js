// this function takes the ssRawTransactionJSON and converts it into a properly formatted eec purchase object
function(){
  
    var rawTransactionJSON = {{DL - SS Raw Transaction JSON}};  

    // first check to make sure something didn't go wrong in the formation of this object
    if(rawTransactionJSON == undefined){
        return undefined;    
    }
  
    // convert the rawCartItemsList into an object with a list of productJSONs and a list of quantities
    var currentCartItemsJSON = {{JS Utility - convert rawCartItemsList to cartItemsJSON}}( rawTransactionJSON.items, 'cartItemsList');

    // create our base level eecPurchase object with the products list
    var eecPurchaseObj = {{JS Utility - create eecObjectFromAction}}('purchase', currentCartItemsJSON.productJSONList, currentCartItemsJSON.quantityList);

    // add the appropriate actionField object to indicate step 1 of checkout
    eecPurchaseObj.ecommerce.purchase['actionField'] = {
        // Transaction ID. Required for purchases and refunds.
        'id': rawTransactionJSON.orderNumber,
        // extra details about where the purchase happened
        'affiliation': 'Cache\'s Store',
        // Total transaction value (incl. tax and shipping)
        'revenue': rawTransactionJSON.grandTotal.decimalValue,
        'tax': rawTransactionJSON.taxTotal.decimalValue,
        'shipping': rawTransactionJSON.shippingTotal.decimalValue
        //'coupon': 'SUMMER_SALE'
    };

    // return our finished object
    return eecPurchaseObj;

}





