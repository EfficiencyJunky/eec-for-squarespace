// the purpose of this utility is to take an entire raw Cart object's items list and convert it to a JSON
// with only the most important parts using the variant SKU as primary key into this object
function(){
    // if the conversionType is not specified, we assume the caller wants a cartItemsObj
    return function(rawItemsList, conversionType){

        // pull the raw items list from the cart object
        //var rawItemsList = rawCartJSON.cart.items;
        var cartItemsObj = {};

        if(conversionType === 'cartItemsList'){
            cartItemsObj["productJSONList"] = [];
            cartItemsObj["quantityList"] = [];
        }

        // grab the cookie with the additional parameters for all the variants
        var cookieData = JSON.parse({{Cookie - variantsAddedToCart}} || '{}');

        // variables to use in the list
        var i, rawItem, variantCookieData, productJSON;

        // for each item in the cart items list, extract the relevant information and combine it with the cookie information to create a new cartItemJSON with all relevant details to create our eec action
        for(i=0; i < rawItemsList.length; i++){
            rawItem = rawItemsList[i];

            // adding the "or empty obj" avoids function failure if cookie is missing or malformed when we try to access keys below 
            variantCookieData = cookieData[rawItem.sku] || {};

            productJSON = {
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

            if(conversionType === "cartItemsList"){
                cartItemsObj.productJSONList.push(productJSON);
                cartItemsObj.quantityList.push(rawItem.quantity);
            }
            else{
                cartItemsObj[rawItem.sku] = {
                    'quantityInCart': rawItem.quantity,
                    'productJSON': productJSON
                }
            }

        }

        return cartItemsObj;
    }
}