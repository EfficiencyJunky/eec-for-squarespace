// we can find this object by scraping the DOM before the DOM.Ready event
// we can also access this variable AFTER DOM.Ready simply by accessing:
//    Y.Squarespace.CommerceAnalytics._yuievt.events["commerceTrack:commerce-checkout-confirmed"].details[0]

var purchaseCompletePageScriptContents = {
    id: '5fb734bc1b54d22df157f49a',
    orderNumber: '12439',
    websiteId: '5db646aa924a603ce094fb9b',
    purchasedCartId: '5fb73476da47fc7bdff15746',
    testMode: true,
    grandTotal: {
        currencyCode: 'USD', 
        value: 1100, 
        decimalValue: '11.00', 
        fractionalDigits: 2
    },
    grandTotalFormatted: '$11.00',
    subtotal: {
        currencyCode: 'USD', 
        value: 1000, 
        decimalValue: '10.00', 
        fractionalDigits: 2
    },
    subtotalFormatted: '$10.00',
    taxTotal: {
        currencyCode: 'USD', 
        value: 0, 
        decimalValue: '0.00', 
        fractionalDigits: 2
    },
    taxTotalFormatted: '$0.00',
    shippingTotal: {
        currencyCode: 'USD', 
        value: 100, 
        decimalValue: '1.00', 
        fractionalDigits: 2
    },
    shippingTotalFormatted: '$1.00',
    billingDetails: {customer: ''},
    items: [
      {
        sku: 'SQ4897009',
        productName: 'MARE LUNE sticker',
        unitPrice: {
            currencyCode: 'USD', 
            value: 500, 
            decimalValue: '5.00', 
            fractionalDigits: 2
        },
        quantity: 1
      },
      {
        sku: 'SQ7346474',
        productName: 'YOUR HEART sticker',
        unitPrice: {
            currencyCode: 'USD', 
            value: 500, 
            decimalValue: '5.00', 
            fractionalDigits: 2
        },
        quantity: 1
      }
    ]
}