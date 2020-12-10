// we get access to the "newlyAdded" data structure when a customer clicks the "Add to Cart" button and the "commerce-item-added" event fires.
// the event returns newlyAdded as one of its parameters "e.newlyAdded"
// we can also access to newlyAdded AFTER anytime after the event has fired simply by accessing:
//    Y.Squarespace.CommerceAnalytics._yuievt.events["commerceTrack:commerce-item-added"].details[0].newlyAdded


var newlyAdded = {
    "id": "5fd15facf2ee360040eacce4",
    "item":{
        "price":{
            "currency": "USD",
            "value": "2.00"
        }
    },
    "itemId": "5fcd79cad336b863f0d8500c",
    "quantity": 1,
    "title": "single item no variants",
    "purchasePriceCents": 200,
    "nonSalePriceCents": 200,
    "chosenVariant":{
        "optionValues": [],
        "id": "57dbe036-f8d3-49f1-ad53-e304410f811f",
        "sku": "SQ2270176",
        "price": 200,
        "salePrice": 0,
        "onSale": false,
        "unlimited": true,
        "qtyInStock": 0,
        "width": 0,
        "height": 0,
        "weight": 0,
        "len": 0
    },
    "productType": 1,
    "subTotal": 200
}



// we get access to the "shoppingCart" data structure when a customer clicks the "Add to Cart" button and the "commerce-item-added" event fires.
// the event returns shoppingCart as one of its parameters "e.shoppingCart"
// we can also access to shoppingCart AFTER anytime after the event has fired simply by accessing:
//    Y.Squarespace.CommerceAnalytics._yuievt.events["commerceTrack:commerce-item-added"].details[0].shoppingCart


var shoppingCart = {
    "id": "5fd15facf2ee360040eaccdc",
    "cartToken": "FgsRy1gXc3IEzuOfDrn6R6zqKWHGxrS7vTHyvQUg",
    "websiteId": "5c04a037c258b4c112b25fdb",
    "created": 1607557036743,
    "entries": [
      {
        "id": "5fd15facf2ee360040eacce4",
        "item": {
          "price": {
            "currency": "USD",
            "value": "2.00"
          }
        },
        "itemId": "5fcd79cad336b863f0d8500c",
        "quantity": 1,
        "title": "single item no variants",
        "purchasePriceCents": 200,
        "nonSalePriceCents": 200,
        "chosenVariant": {
          "optionValues": [],
          "id": "57dbe036-f8d3-49f1-ad53-e304410f811f",
          "sku": "SQ2270176",
          "price": 200,
          "salePrice": 0,
          "onSale": false,
          "unlimited": true,
          "qtyInStock": 0,
          "width": 0,
          "height": 0,
          "weight": 0,
          "len": 0
        },
        "productType": 1,
        "subTotal": 200
      }
    ],
    "shippingOptions": [],
    "shippingOptionsStatus": "INCOMPLETE ADDRESS",
    "shippingLocation": {},
    "taxLineItems": [],
    "coupons": [],
    "promoCodes": [],
    "appliedGiftCards": [],
    "cartType": 1,
    "validCoupons": [],
    "invalidCoupons": [],
    "subtotalCents": 200,
    "taxCents": 0,
    "shippingCostCents": 0,
    "discountCents": 0,
    "giftCardRedemptionTotalCents": 0,
    "grandTotalCents": 200,
    "amountDueCents": 200,
    "totalQuantity": 1,
    "purelyDigital": false,
    "hasDigital": false,
    "requiresShipping": true
}