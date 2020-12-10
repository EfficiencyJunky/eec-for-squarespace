// this function takes the rawProductDetail and converts it into a properly formatted object with a single "detail" key that Google Tag Manager can use to generate an Enhanced Ecommerce event for the Product Detail View
function(){
  
    // grab a reference to the raw data pushed to the dataLayer from SS Code Injection
    var ssRawProductDetail = {{DL - SS Raw Product Detail}};  

    // first check to make sure something didn't go wrong in the formation of this object
    if(ssRawProductDetail == undefined){
        return undefined; 
    }
  
    // convert the raw "ssRawProductDetail" object to a productJSON
    var productJSON = convertSSRawProductDetailtoProductJSON(ssRawProductDetail);

    // create our base level eecCheckout object
    var eecDetailObj = {{JS Utility - createEecObjectFromAction}}('detail', productJSON);

    // add the actionField with 'list' key/value based on the referrer, who's query parameters should have the list's "category" in it
    // this function will only add the list if the referrer actually had this query parameter
    {{JS Utility - addListFromReferrer}}(eecDetailObj, 'detail', {{Referrer}});        
    
    
    // return our properly formatted enhanced ecommerce detail event object
    return eecDetailObj;


    // *********************************************************************************
    // This function does the work of converting the "newlyAdded" object to a productJSON
    // *********************************************************************************
    function convertSSRawProductDetailtoProductJSON(ssRawProductDetail){

        // this is where we get the details for how this product is displayed
        var variants = ssRawProductDetail.product.variants;

        var onSale = variants[0].onSale,         
            unlimited = variants[0].stock.unlimited, 
            qtyInStock = variants[0].stock.quantity,
            price = (variants[0].onSale) ? variants[0].salePrice.decimalValue : variants[0].price.decimalValue,   
            i_price;

        // onSale - set to 'true' if any of the variants is listed as onSale (even if it's out of stock)
        // unlimited - set to 'true' if any of the variants is unlimited
        // qtyInStock - set to 0 if unlimited is true, otherwise set to the highest value of the items
        // price - save the lowest price of all the variants (even if it is out of stock)
        for(var i=1; i < variants.length; i++){
            onSale = onSale || variants[i].onSale;
            unlimited = unlimited || variants[i].stock.unlimited;
            qtyInStock =  (unlimited) ? 0 : 
                            (qtyInStock >= variants[i].stock.quantity) ? qtyInStock : variants[i].stock.quantity;
            
            // capture the price of the next variant in the list
            i_price = (variants[i].onSale) ? variants[i].salePrice.decimalValue : variants[i].price.decimalValue;
            price = (price <= i_price) ? price: i_price;
        }

        // initialize the productJSON
        var productJSON = {
            'productId': ssRawProductDetail.item.id,
            'productName': ssRawProductDetail.item.title,
            // we may want to update this to retrieve category info from a cookie generated during product impressions
            'productCategory': ssRawProductDetail.category,
            // may want to add 'productPrice' but this is TBD
            'variants': [{
                'sku': 'not_added',
                'options': 'not_added',
                'price': price,
                'unlimited': unlimited,
                'qtyInStock': qtyInStock, // can be 0 if unlimited is true
                'onSale': onSale
            }]
        };

        return productJSON;
    }
}