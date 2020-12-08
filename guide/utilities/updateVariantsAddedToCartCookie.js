/**
 * A Utility function that takes the information about a product variant stored in a "productJSON" and saves a subset of that information in the "variantsAddedToCart" cookie, using the variant's SKU as primary key to access the variant information. 
 * We will be using this cookie thoughout the funnel to form our other productJSON objects when the data we need for them is missing
 * 
 * @param {Object} productJSON a productJSON object
 * @returns nothing
 */

function(){
    return function(productJSON){

        var variantAdded = productJSON.variants[0];

        // #1 create the variant specific object we will used to update the cookie
        var variantDetails = {
            'pid': productJSON.productId,
            'cat': productJSON.productCategory,
            'unl': variantAdded.unlimited,
            'qty': variantAdded.qtyInStock,
            'sal': variantAdded.onSale
        }

        // #2 get the value of the current cookie if there is one or create an empty object
        var cookieVal = JSON.parse({{Cookie - variantsAddedToCart}} || '{}');

        // #3 set the object with SKU as key
        cookieVal[variantAdded.sku] = variantDetails;

        //console.log(JSON.stringify(cookieVal));

        // #4 save the cookie again
        {{JS Utility - setCookie}}(
                                    "variantsAddedToCart", 
                                    JSON.stringify(cookieVal), 
                                    2419200000, 
                                    '/', 
                                    {{Page Hostname}}
                                );
    }
}