/**
 * A Utility function that takes a list of cart items in their raw form and converts it to one of two data structures based on the value of the "returnDataStructureType" parameter. Both types of data structures represent the products and the quantity of each product currently in the cart.
 * 1. if the "returnDataStructureType" parameter is undefined - An object who's primary keys are the SKU of each product variant in the rawItemsList and values at each key are a productJSON object and quantity. This will be used in the Modify Cart operations.
 * 2. if the "returnDataStructureType" parameter is set to "cartItemsLists" -- An object containing two lists of equal length. One list contains all of the productJSON objects that describe the cart's contents and the other list contains the quantities of each product in the cart. This will be used in the Checkout and Purchase operations.
 * 
 * @param {Object} rawItemsList a list of items in the cart. each item in the list is structured in the SS raw format that we want to convert from
 * @param {String} returnDataStructureType tells the function which of the two data structures listed above that we want to return. Can be undefined or set to 'cartItemsLists'
 * @returns {Object} cartItemsObj in one of the two formats listed above
 */

function(){
    // if the returnDataStructureType is not specified, we assume the caller wants a cartItemsObj
    return function(rawItemsList, returnDataStructureType){

        // create our cartItemsObject
        var cartItemsObj = {};

        // if the returnDataStructureType is set to "cartItemsLists" then we will want to 
        // fill the cartItemsObj with two lists. 
        //      One with all the productJSONs
        //      and one with the corresponding Quantities
        if(returnDataStructureType === 'cartItemsLists'){
            cartItemsObj["productJSONList"] = [];
            cartItemsObj["quantityList"] = [];
        }

        // grab the cookie with the additional parameters for all the variants or create an empty object if it doesn't exist
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
                    'options': variantCookieData.opt,
                    'price': rawItem.unitPrice.decimalValue,
                    'unlimited': variantCookieData.unl,
                    'qtyInStock': variantCookieData.qty,
                    'onSale': variantCookieData.sal
                }]
            }

            // depending on the returnDataStructureType, 
            // either push the productJSON and quantity to their corresponding lists
            // or add them as parameters in an object with the product's sku as the primary key
            if(returnDataStructureType === "cartItemsLists"){
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