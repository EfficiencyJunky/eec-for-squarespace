// we can find this object by scraping the DOM before the DOM.Ready event
// we can also access this variable AFTER DOM.Ready simply by accessing:
//    Y.Squarespace.CommerceAnalytics._yuievt.events["commerceTrack:commerce-checkout-confirmed"].details[0]


var purchaseCompletePageScriptContents = {



}



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



// squarespace doesn't indicate if a coupon was used on checkout
// but squarespace DOES offer coupons for a single product or as a discount on the entire order
// we can detect if a coupon was used by comparing the grandTotal minus tax and shipping to the subtotal
var purchaseWithCoupon = {
    id: '5fd27f976284eb75bb6d12d1',
    orderNumber: '00005',
    websiteId: '5c04a037c258b4c112b25fdb',
    purchasedCartId: '5fd27f2810bb3b6da580c616',
    testMode: true,
    grandTotal: {
      currencyCode: 'USD',
      "value": 1720,
      decimalValue: '17.20',
      fractionalDigits: 2
    },
    grandTotalFormatted: '$16.00',
    subtotal: {
      currencyCode: 'USD',
      "value": 1500,
      decimalValue: '15.00',
      fractionalDigits: 2
    },
    subtotalFormatted: '$15.00',
    taxTotal: {
      currencyCode: 'USD',
      "value": 120,
      decimalValue: '1.20',
      fractionalDigits: 2
    },
    taxTotalFormatted: '$1.20',
    shippingTotal: {
      currencyCode: 'USD',
      "value": 300,
      decimalValue: '3.00',
      fractionalDigits: 2
    },
    shippingTotalFormatted: '$3.00',
    billingDetails: {customer: ''},
    items: [
      {
        sku: 'SQ8858424',
        productName: 'regular price unlimited stock product',
        unitPrice: {
          currencyCode: 'USD',
          value: 500,
          decimalValue: '5.00',
          fractionalDigits: 2
        },
        quantity: 2
      },
      {
        sku: 'SQ6738738',
        productName: '12/24V and USB Power Switcher',
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






var priceWithTax = {
    id: '5fd28bbd4e3b216e6e62d3bd',
    orderNumber: '00006',
    websiteId: '5c04a037c258b4c112b25fdb',
    purchasedCartId: '5fd284333497c1706a4fe084',
    testMode: true,
    grandTotal: {
      currencyCode: 'USD',
      value: 858,
      decimalValue: '8.58',
      fractionalDigits: 2
    },
    grandTotalFormatted: '$8.58',
    subtotal: {
      currencyCode: 'USD',
      value: 500,
      decimalValue: '5.00',
      fractionalDigits: 2
    },
    subtotalFormatted: '$5.00',
    taxTotal: {
      currencyCode: 'USD',
      value: 58,
      decimalValue: '0.58',
      fractionalDigits: 2
    },
    taxTotalFormatted: '$0.58',
    shippingTotal: {
      currencyCode: 'USD',
      value: 300,
      decimalValue: '3.00',
      fractionalDigits: 2
    },
    shippingTotalFormatted: '$3.00',
    billingDetails: {customer: ''},
    items: [
      {
        sku: 'SQ8858424',
        productName: 'regular price unlimited stock product',
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