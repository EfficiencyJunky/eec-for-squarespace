function(){
    // *******************************************************************************
    // This function takes the relevant details from "productJSON"
    // and saves them in the "variantsAddedToCart" cookie
    // we will use this thoughout the funnel to form our other productJSON objects
    // *******************************************************************************
    return function(productJSON){

        var variantAdded = productJSON.variants[0];

        // #1 create the updated cookie object for this variant
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