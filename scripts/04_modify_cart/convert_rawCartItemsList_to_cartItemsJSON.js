// the purpose of this utility is to take an entire raw Cart object's items list and convert it to a JSON
// with only the most important parts using the variant SKU as primary key into this object
function(){
    // if the conversionType is not specified, we assume the caller wants a cartItemsObj
    return function(rawItemsList, conversionType){

        // create our cartItemsObject
        var cartItemsObj = {};

        // if the conversionType is set to "cartItemsList" then we will want to 
        // fill the cartItemsObj with two lists. 
        //      One with all the productJSONs
        //      and one with the corresponding Quantities
        if(conversionType === 'cartItemsList'){
            cartItemsObj["productJSONList"] = [];
            cartItemsObj["quantityList"] = [];
        }

        // grab the cookie with the additional parameters for all the variants
        var cookieData = JSON.parse({{Cookie - variantsAddedToCart}} || '{}');

        // variables to use in the loop
        var i, rawItem, variantCookieData, productJSON;

        // for each item in the cart items list, extract the relevant information and combine it with the cookie information to create a new productJSON with all relevant details to create our eec action
        for(i=0; i < rawItemsList.length; i++){
            rawItem = rawItemsList[i];

            // adding the "or empty obj" avoids function failure if cookie is missing or malformed when we try to access keys below 
            variantCookieData = cookieData[rawItem.sku] || {};

            productJSON = {
                // if the data doesn't exist in the item try to get it from the cookie
                'productId': rawItem.productId || variantCookieData.pid,
                'productName': rawItem.productName,
                'productCategory': variantCookieData.cat,
                'variants': 
                [{
                    'sku': rawItem.sku,
                    'price': rawItem.unitPrice.decimalValue,
                    'unlimited': variantCookieData.unl,
                    'qtyInStock': variantCookieData.qty,
                    'onSale': variantCookieData.sal
                }]
            }

            // depending on the conversionType, 
            // either add the productJSON and quantity to lists
            // or add them to an object with the product's sku as the primary key
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