// the purpose of this utility is to take an entire raw Cart object's items list and convert it to a JSON
// with only the most important parts using the variant SKU as primary key into this object
function(){
    return function(rawCartJSON){

        // pull the raw items list from the cart object
        var rawItemsList = rawCartJSON.cart.items;

        // grab the cookie with the additional parameters for all the variants
        var cookieData = JSON.parse({{Cookie - added product details}} || '{}');

        var cleanItemsJSON = {};

        for(var i=0; i < rawItemsList.length; i++){
            var rawItem = rawItemsList[i];

            // adding the "or empty obj" avoids function failure if cookie is missing or malformed when we try to access keys below 
            var variantCookieData = cookieData[rawItem.sku] || {};

            var cleanItem = {
                'itemId': rawItem.productId,
                'itemTitle': rawItem.productName,
                'itemCategory': rawItem.variantOptions[0].value,
                'variantDetails': {
                    'price': rawItem.unitPrice.decimalValue,
                    'quantityInCart': rawItem.quantity,
                    //'sku': rawItem.sku,
                    'unlimited': variantCookieData.unlimited,
                    'qtyInStock': variantCookieData.qtyInStock,
                    'onSale': variantCookieData.onSale
                }
            }

            cleanItemsJSON[rawItem.sku] = cleanItem;
        }

        return cleanItemsJSON;
    }
}