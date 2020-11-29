// the purpose of this utility is to take an entire raw Cart object's items list and convert it to a JSON
// with only the most important parts using the variant SKU as primary key into this object
function(){
    return function(rawCartJSON){

        // pull the raw items list from the cart object
        var rawItemsList = rawCartJSON.cart.items;
        var cartItemsJSON = {};

        // grab the cookie with the additional parameters for all the variants
        var cookieData = JSON.parse({{Cookie - variantsAddedToCart}} || '{}');

        // for each item in the cart items list, extract the relevant information and combine it with the cookie information to create a new cartItemJSON with all relevant details to create our eec action
        for(var i=0; i < rawItemsList.length; i++){
            var rawItem = rawItemsList[i];

            // adding the "or empty obj" avoids function failure if cookie is missing or malformed when we try to access keys below 
            var variantCookieData = cookieData[rawItem.sku] || {};

            var cartItemJSON = {
                'quantityInCart': rawItem.quantity,
                'productJSON': {
                    'productId': rawItem.productId,
                    'productName': rawItem.productName,
                    'productCategory': rawItem.variantOptions[0].value,
                    'variants': 
                    [{
                        'sku': rawItem.sku,
                        'price': rawItem.unitPrice.decimalValue,
                        'unlimited': variantCookieData.unlimited,
                        'qtyInStock': variantCookieData.qtyInStock,
                        'onSale': variantCookieData.onSale
                    }]
                }
            }

            cartItemsJSON[rawItem.sku] = cartItemJSON;
        }

        return cartItemsJSON;
    }
}