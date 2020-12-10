// we get access to the "newlyAdded" data structure when a customer clicks the "Add to Cart" button and the "commerce-item-added" event fires.
// the event returns newlyAdded as one of its parameters "e.newlyAdded"
// we can also access to newlyAdded AFTER anytime after the event has fired simply by accessing:
//    Y.Squarespace.CommerceAnalytics._yuievt.events["commerceTrack:commerce-item-added"].details[0].newlyAdded


var newlyAdded = {
  "id": "5fcd75ef05ddc9599d372c12",
  "item": {
    "price": {
      "currency": "USD",
      "value": "5.00"
    }
  },
  "itemId": "5fcd65ae3ff1011540045eda",
  "quantity": 2,
  "title": "regular price unlimited stock product",
  "purchasePriceCents": 500,
  "nonSalePriceCents": 500,
  "chosenVariant": {
    "optionValues": [
      {
        "optionName": "size",
        "value": "small"
      },
      {
        "optionName": "color",
        "value": "black"
      }
    ],
    "id": "53661187-50e4-4aed-af51-40d5c7083afd",
    "sku": "SQ8858424",
    "price": 500,
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
  "subTotal": 1000
}



// we get access to the "shoppingCart" data structure when a customer clicks the "Add to Cart" button and the "commerce-item-added" event fires.
// the event returns shoppingCart as one of its parameters "e.shoppingCart"
// we can also access to shoppingCart AFTER anytime after the event has fired simply by accessing:
//    Y.Squarespace.CommerceAnalytics._yuievt.events["commerceTrack:commerce-item-added"].details[0].shoppingCart


var shoppingCartWithoutWeightOrVariants = {
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


var shoppingCartWithWeightAndVariants = {
  "id": "5fcd5ae6c00f007ceaf8fd14",
  "cartToken": "_X13HoasoiRkxgjDMKsJUELFLTQ4ljj9yo07qcH_",
  "websiteId": "5c04a037c258b4c112b25fdb",
  "created": 1607293670864,
  "entries": [
    {
      "id": "5fcd5d7f6f0099009e757d66",
      "item": {
        "price": {
          "currency": "USD",
          "value": "5.00"
        }
      },
      "itemId": "5fcd51dc2fa8bc6bcdf93cfc",
      "quantity": 1,
      "title": "12/24V and USB Power Switcher",
      "purchasePriceCents": 500,
      "nonSalePriceCents": 500,
      "chosenVariant": {
        "optionValues": [
          {
            "optionName": "Product Version",
            "value": "Accessory"
          },
          {
            "optionName": "Add On",
            "value": "Yes"
          }
        ],
        "id": "4220e3e7-29a8-4359-9bbf-e02b8e750f73",
        "sku": "SQ6738738",
        "price": 500,
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
      "subTotal": 500
    },
    {
      "id": "5fcd75ef05ddc9599d372c12",
      "item": {
        "price": {
          "currency": "USD",
          "value": "5.00"
        }
      },
      "itemId": "5fcd65ae3ff1011540045eda",
      "quantity": 2,
      "title": "regular price unlimited stock product",
      "purchasePriceCents": 500,
      "nonSalePriceCents": 500,
      "chosenVariant": {
        "optionValues": [
          {
            "optionName": "size",
            "value": "small"
          },
          {
            "optionName": "color",
            "value": "black"
          }
        ],
        "id": "53661187-50e4-4aed-af51-40d5c7083afd",
        "sku": "SQ8858424",
        "price": 500,
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
      "subTotal": 1000
    }
  ],
  "shippingOptions": [
    {
      "websiteId": "5c04a037c258b4c112b25fdb",
      "name": "USPS",
      "rateType": 3,
      "regions": [
        {}
      ],
      "availableEverywhere": false,
      "formula": {
        "formulaName": "WEIGHT_RANGE",
        "ranges": [
          {
            "from": 0,
            "to": 1,
            "priceCents": 300
          },
          {
            "from": 1.01,
            "to": 5,
            "priceCents": 1000
          },
          {
            "from": 5.01,
            "to": -1,
            "priceCents": 2000
          }
        ],
        "locallyCalculated": true,
        "carrierCalculated": false
      },
      "key": "5fcd61af2fa8bc6bcdfbcf8d",
      "id": "5fcd61af2fa8bc6bcdfbcf8d",
      "computedCost": 300
    }
  ],
  "shippingOptionsStatus": "APPLICABLE_SHIPPING_OPTIONS",
  "selectedShippingOption": {
    "websiteId": "5c04a037c258b4c112b25fdb",
    "name": "USPS",
    "rateType": 3,
    "regions": [
      {}
    ],
    "availableEverywhere": false,
    "formula": {
      "formulaName": "WEIGHT_RANGE",
      "ranges": [
        {
          "from": 0,
          "to": 1,
          "priceCents": 300
        },
        {
          "from": 1.01,
          "to": 5,
          "priceCents": 1000
        },
        {
          "from": 5.01,
          "to": -1,
          "priceCents": 2000
        }
      ],
      "locallyCalculated": true,
      "carrierCalculated": false
    },
    "key": "5fcd61af2fa8bc6bcdfbcf8d",
    "id": "5fcd61af2fa8bc6bcdfbcf8d",
    "computedCost": 300
  },
  "shippingLocation": {
    "city": "",
    "country": "United States",
    "state": "",
    "zip": ""
  },
  "taxLineItems": [
    {
      "name": "Tax",
      "rate": 0,
      "valueCents": 0
    }
  ],
  "coupons": [],
  "promoCodes": [],
  "appliedGiftCards": [],
  "cartType": 1,
  "validCoupons": [],
  "invalidCoupons": [],
  "subtotalCents": 1500,
  "taxCents": 0,
  "shippingCostCents": 300,
  "discountCents": 0,
  "giftCardRedemptionTotalCents": 0,
  "grandTotalCents": 1800,
  "amountDueCents": 1800,
  "totalQuantity": 3,
  "purelyDigital": false,
  "hasDigital": false,
  "requiresShipping": true
}