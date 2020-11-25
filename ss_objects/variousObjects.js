var foo = {
    id: '5fb734bc1b54d22df157f49a',
    orderNumber: '12439',
    websiteId: '5db646aa924a603ce094fb9b',
    purchasedCartId: '5fb73476da47fc7bdff15746',
    testMode: true,
    grandTotal: {
        currencyCode: 'USD', value: 1100, decimalValue: '11.00', fractionalDigits: 2
    },
    grandTotalFormatted: '$11.00',
    subtotal: {
        currencyCode: 'USD', value: 1000, decimalValue: '10.00', fractionalDigits: 2
    },
    subtotalFormatted: '$10.00',
    taxTotal: {
        currencyCode: 'USD', value: 0, decimalValue: '0.00', fractionalDigits: 2
    },
    taxTotalFormatted: '$0.00',
    shippingTotal: {
        currencyCode: 'USD', value: 100, decimalValue: '1.00', fractionalDigits: 2
    },
    shippingTotalFormatted: '$1.00',
    billingDetails: {customer: ''},
    items: [
      {
        sku: 'SQ4897009',
        productName: 'MARE LUNE sticker',
        unitPrice: {currencyCode: 'USD', value: 500, decimalValue: '5.00', fractionalDigits: 2},
        quantity: 1
      },
      {
        sku: 'SQ7346474',
        productName: 'YOUR HEART sticker',
        unitPrice: {currencyCode: 'USD', value: 500, decimalValue: '5.00', fractionalDigits: 2},
        quantity: 1
      }
    ]
}











    function bar(){
    
        // create the list of products that were purchased and fill all the required Enhanced Ecommerce Fields
        var products = [];
    
        // grab the items from Squarespace transaction details object
        var itemsPurchased = NAME_OF_RAW_JSON.items;

        // loop through all the items and add them to our products list with Enhanced Ecommerce Fields copied over
        for (var i=0; i < itemsPurchased.length; i++){
            var product = {};
            product["name"] = itemsPurchased[i].productName;
            product["id"] = itemsPurchased[i].sku;
            product["price"] = itemsPurchased[i].unitPrice.decimalValue;
            product["quantity"] = itemsPurchased[i].quantity;

            products.push(product);
        }


        // create our properly formatted enhanced ecommerce purchase event object 
        // by copying associated fields from the SS transaction details object
        // and using the "products" list we generated above
        var eePurchaseEventObj = {
            'purchase': {
                'actionField': {
                    // Transaction ID. Required for purchases and refunds.
                    'id': NAME_OF_RAW_JSON.orderNumber,
                    //'affiliation': 'Online Store',
                    // Total transaction value (incl. tax and shipping)
                    'revenue': NAME_OF_RAW_JSON.grandTotal.decimalValue,
                    'tax': NAME_OF_RAW_JSON.taxTotal.decimalValue,
                    'shipping': NAME_OF_RAW_JSON.shippingTotal.decimalValue
                    //'coupon': 'SUMMER_SALE'
                },
                'products': products      
                // List of productFieldObjects.
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
            }
        }


    }



    var allPurchaseDetailsPayload = {
      'ecommerce': eePurchaseEventObj,
      'ssTransactionId': NAME_OF_RAW_JSON.id
    }
  
    return allPurchaseDetailsPayload;
  
  
}