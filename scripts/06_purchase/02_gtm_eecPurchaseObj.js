// this function takes the ssRawTransaction and converts it into a properly formatted eec purchase object
function(){
  
    var ssRawTransaction = {{DL - SS Raw Transaction}};  

    // first check to make sure something didn't go wrong in the formation of this object
    if(ssRawTransaction == undefined){
        return undefined;    
    }
  
    // convert the rawCartItemsList into an object with a list of productJSONs and a list of quantities
    var currentCartItemsList = {{JS Utility - convert rawCartItemsList to cartItemsJSON}}( ssRawTransaction.items, 'cartItemsList');

    // create our base level eecPurchase object with the products list
    var eecPurchaseObj = {{JS Utility - create eecObjectFromAction}}('purchase', currentCartItemsList.productJSONList, currentCartItemsList.quantityList);

    // add the appropriate actionField object to indicate step 1 of checkout
    eecPurchaseObj.ecommerce.purchase['actionField'] = {
        // Transaction ID. Required for purchases and refunds.
        'id': ssRawTransaction.orderNumber,
        // extra details about where the purchase happened
        'affiliation': 'Cache\'s Store',
        // Total transaction value (incl. tax and shipping)
        'revenue': ssRawTransaction.grandTotal.decimalValue,
        'tax': ssRawTransaction.taxTotal.decimalValue,
        'shipping': ssRawTransaction.shippingTotal.decimalValue
        //'coupon': 'SUMMER_SALE'
    };

    // return our finished object
    return eecPurchaseObj;

}





