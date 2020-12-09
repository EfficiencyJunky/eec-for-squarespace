# IMPLEMENTATION GUIDE FOR THE "PURCHASE" EEC ACTION

1. Implement a SS Code Injection script to push raw transaction details to dataLayer
    1. In Squarespace, navigate to "Settings -> Advanced -> Code Injection" 
    2. Copy [this code][01_datalayer_push_code] into the "ORDER CONFIRMATION PAGE" section at the very bottom
    3. click "save" to save the changes. (NOTE: in some cases after clicking save, the contents of the code injection box disappear. This is a bug in Squarespace. Just reload the page and it will re-appear)
    4. To test this, we will have to actually make a purchase. Back in GTM, start or restart Preview mode, add a product to cart, visit the cart page, and click checkout. If the checkout page is hosted on "secure.squarespace.com" then GTM may complain that it has lost the connection. Disregard this complaint, complete the checkout, and you should be re-directed to the URL Path "/checkout/order-confirmed" (it will have some query parameters in it as well)
    The `ssRawTransactionPush` event should show up in the Summary tab. Click on this event and check to make sure the `DL - SS Raw Transaction` and `URL Query - oid (for SS Transaction ID)` variables have been populated.


2. Back in GTM, use a Custom Javascript Variable to transform the purchased items list into a list of `productJSON` objects and quantities, and then generate our `purchase` EEC data structure out of these lists (including the actionField with overall transaction details)
    1. Create a Custom Javascript Variable and name it `JS - eec.purchase`
    2. Copy [this code][02_eec_object_creation_code] to the "Custom JavaScript" section
    3. Save the variable
    4. To test this, re-start Preview mode in GTM and complete another purchase. Now we should see the `JS - eec.purchase` variable populate with a properly formatted EEC Object. See below for an example of what this looks like.


<br/>
<br/>
<br/>

**EEC PURCHASE DATA STRUCTURE REFERENCE**<br/>
This is an example of what the EEC data structure for action of type `purchase` looks like with 2 products. Notice that the 'revenue' is set to the grand total of the transaction. It is possible to change 'revenue' to only track the subtotal of the cart (total of all products in the cart without tax and shipping) by modifying the code in the Custom Javascript variable we created in step 2 above. Just substitute the line `'revenue': ssRawTransaction.grandTotal.decimalValue,` with `'revenue': ssRawTransaction.subtotal.decimalValue,`. Make sure not to delete the trailing comma.


```
{
  'ecommerce': {
    'checkout': {
      'products': [
        {
          'id': '399sdccsfjl8990933kkj3jkl3',
          'name': 'added product name',
          'category': 'categoryA/categoryB',
          'brand': 'Your Brand Name',
          'quantity': 2,
          'dimension5': 'SQ1234567',
          'price': '6.00',
          'dimension6': 'In Stock',
          'dimension7': 'On Sale'
        },
        {
          'id': '44222adf0989dfdfdf9992kjkljkj',
          'name': 'removed product name',
          'category': 'categoryC/categoryD',
          'brand': 'Your Brand Name',
          'quantity': 3,
          'dimension5': 'SQ7654321',
          'price': '10.00',
          'dimension6': 'In Stock',
          'dimension7': 'Regular Price'
        }
      ],
      'actionField':  {
        'id': 'PO12345',
        'affiliation': 'Your Brand Name' + ' Store',
        'revenue': '54.07',
        'tax': '3.57',
        'shipping': '8.50'
      }
    }
  }
}
```


[01_datalayer_push_code]: ./01_ss_rawTransactionPush.html
[02_eec_object_creation_code]: ./02_gtm_eecPurchaseObj.js



<script>
OTHER DETAILS
1. Create a trigger that fires when the Squarespace event key in step 1 is detected in the dataLayer

2. Create a tag that fires on this trigger and sends an event hit to GA with custom dimension for SS Transaction ID and Enhanced Ecommerce enabled with data from custom Javascript in Step 2
</script>


<!--REFERENCE OBJECT PUSH-->
<!--DO NOT USE THIS CODE IN SQUARESPACE -- IT IS JUST FOR REFERENCE-->
<script>

dataLayer.push({
	event: 'ssRawTransactionJSONPushed_ss',
	ssCommerceScriptJSON: {
	  id: '5fb734bc1b54d22df157f49a', // the squarespace transaction ID
	  orderNumber: '12439',
	  websiteId: '5db646aa924a603ce094fb9b',
	  purchasedCartId: '5fb73476da47fc7bdff15746',
	  testMode: true,
	  grandTotal: {currencyCode: 'USD', value: 1100, decimalValue: '11.00', fractionalDigits: 2},
	  grandTotalFormatted: '$11.00',
	  subtotal: {currencyCode: 'USD', value: 1000, decimalValue: '10.00', fractionalDigits: 2},
	  subtotalFormatted: '$10.00',
	  taxTotal: {currencyCode: 'USD', value: 0, decimalValue: '0.00', fractionalDigits: 2},
	  taxTotalFormatted: '$0.00',
	  shippingTotal: {currencyCode: 'USD', value: 100, decimalValue: '1.00', fractionalDigits: 2},
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
	},
	gtm.uniqueEventId: 6
  })

</script>

<!--REFERENCE OBJECT PUSH-->
<!--DO NOT USE THIS CODE IN SQUARESPACE -- IT IS JUST FOR REFERENCE-->