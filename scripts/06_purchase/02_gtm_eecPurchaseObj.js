// this function takes the ssRawTransactionJSON and converts it into a properly formatted object with a single "purchase" key that Google Tag Manager can use to generate an Enhanced Ecommerce event for the transaction
function(){
  
    var rawTransactionJSON = {{DL - SS Raw Transaction JSON}};  

      // first check to make sure something didn't go wrong in the formation of this object
      if(rawTransactionJSON == undefined){
          return undefined;    
    }
  
    // create the list of products that were purchased and fill all the required Enhanced Ecommerce Fields
    var products = [];

    // grab the items from Squarespace transaction details object
    var itemsPurchased = rawTransactionJSON.items;

    // loop through all the items and add them to our products list with Enhanced Ecommerce Fields copied over
    for (var i=0; i < itemsPurchased.length; i++){
        var product = {};
        product["name"] = itemsPurchased[i].productName;
        product["id"] = itemsPurchased[i].sku;
        product["brand"] = {{const - eec brand}};
        product["price"] = itemsPurchased[i].unitPrice.decimalValue;
        product["quantity"] = itemsPurchased[i].quantity;

        // List of productFieldObject options that can be added
        //   'products': [{
        //     // Name or ID is required.
        //     'name': 'Triblend Android T-Shirt',
        //     'id': '12345',
        //     'price': '15.25',
        //     'brand': 'Google',
        //     'category': 'Apparel',
        //     'variant': 'Gray',
        //     'quantity': 1,
        //     // Optional fields may be omitted or set to empty string.
        //     'coupon': ''
        //    },
        //    {
        //     'name': 'Donut Friday Scented T-Shirt',
        //     'id': '67890',
        //     'price': '33.75',
        //     'brand': 'Google',
        //     'category': 'Apparel',
        //     'variant': 'Black',
        //     'quantity': 1
        //    }]
      
      
      
        products.push(product);
    }


    var eecPurchaseObj = {
        'ecommerce': {
            'purchase': {
                'actionField': {
                    // Transaction ID. Required for purchases and refunds.
                    'id': rawTransactionJSON.orderNumber,
                    // extra details about where the purchase happened
                    'affiliation': 'Cache\'s Store',
                    // Total transaction value (incl. tax and shipping)
                    'revenue': rawTransactionJSON.grandTotal.decimalValue,
                    'tax': rawTransactionJSON.taxTotal.decimalValue,
                    'shipping': rawTransactionJSON.shippingTotal.decimalValue
                    //'coupon': 'SUMMER_SALE'
                },
                'products': products      
            }
        }
    };
  

    // create and return our properly formatted enhanced ecommerce purchase event object 
    // by copying associated fields from the ssRawTransactionJSON object
    // and using the "products" list we generated above
    return eecPurchaseObj;

}