// we can find the "cart" object by scraping the DOM before the DOM.Ready event
// currently there doesn't seem to be a way to access this object without scraping the DOM

// cart with two items, each with two variant options
var cartPageScriptContents = {
    "cart": {
        "id": "5fcd5ae6c00f007ceaf8fd14",
        "cartToken": "_X13HoasoiRkxgjDMKsJUELFLTQ4ljj9yo07qcH_",
        "items": [
            {
                "id": "5fcd75ef05ddc9599d372c12",
                "productId": "5fcd65ae3ff1011540045eda",
                "productType": "PHYSICAL",
                "sku": "SQ8858424",
                "productName": "regular price unlimited stock product",
                "productDescription": "",
                "productUrl": "/store/regular-price-unlimited-stock-product",
                "quantity": 2,
                "multipleQuantityAllowed": true,
                "unitPrice": {
                    "currencyCode": "USD",
                    "value": 500,
                    "decimalValue": "5.00",
                    "fractionalDigits": 2
                },
                "itemTotal": {
                    "currencyCode": "USD",
                    "value": 1000,
                    "decimalValue": "10.00",
                    "fractionalDigits": 2
                },
                "variantOptions": [
                {
                    "name": "size",
                    "value": "small"
                },
                {
                    "name": "color",
                    "value": "black"
                }
                ],
                "image": "",
                "isSubscribable": false
            },
            {
                "id": "5fcd5d7f6f0099009e757d66",
                "productId": "5fcd51dc2fa8bc6bcdf93cfc",
                "productType": "PHYSICAL",
                "sku": "SQ6738738",
                "productName": "12/24V and USB Power Switcher",
                "productDescription": "",
                "productUrl": "/store/1224v-and-usb-power-switcher",
                "quantity": 1,
                "multipleQuantityAllowed": true,
                "unitPrice": {
                    "currencyCode": "USD",
                    "value": 500,
                    "decimalValue": "5.00",
                    "fractionalDigits": 2
                },
                "itemTotal": {
                    "currencyCode": "USD",
                    "value": 500,
                    "decimalValue": "5.00",
                    "fractionalDigits": 2
                },
                "variantOptions": [
                {
                    "name": "Product Version",
                    "value": "Accessory"
                },
                {
                    "name": "Add On",
                    "value": "Yes"
                }
                ],
                "image": "",
                "isSubscribable": false
            }        
        ],
        "shippingLocation": {
            "city": "",
            "region": "",
            "postalCode": "",
            "country": "US"
        },
        "shippingOptions": [],
        "discounts": [],
        "giftCards": [],
        "taxes": [],
        "subtotal": { "currencyCode": "USD", "value": 1500, "decimalValue": "15.00", "fractionalDigits": 2},
        "shippingTotal": { "currencyCode": "USD", "value": 0, "decimalValue": "0.00", "fractionalDigits": 2},
        "discountTotal": { "currencyCode": "USD", "value": 0, "decimalValue": "0.00", "fractionalDigits": 2},
        "taxTotal": { "currencyCode": "USD", "value": 0, "decimalValue": "0.00", "fractionalDigits": 2},
        "appliedGiftCardBalanceTotal": { "currencyCode": "USD", "value": 0, "decimalValue": "0.00", "fractionalDigits": 2},
        "grandTotal": {
            "currencyCode": "USD",
            "value": 1500,
            "decimalValue": "15.00",
            "fractionalDigits": 2
        },
        "amountDue": { "currencyCode": "USD", "value": 1500, "decimalValue": "15.00", "fractionalDigits": 2},
        "cartType": 1,
        "shouldBlockPurchaseForMinimumOrderAmount": false
    },
    "storeCurrency": "USD",
    "continueShoppingLinkUrl": "store",
    "minimumOrderSubtotal": {
        "currency": "USD",
        "value": "0.00"
    },
    "locale": "en-US",
    "useCldrMode": false
}









// cart with two items and one variant option each
var cartPageScriptContents = {
    "cart":{
        "id":"5fbc48a972f8b574a0dd6a5b",
        "cartToken":"qWu9RKWs5a6TcF62sWYrG-SU8i-D1X2PuMPEi1s3",
        "items":[
            {
                "id":"5fbc8a71b7ee8e7075937b7f",
                "productId":"5eba1a2b98f2a93833214793",
                "productType":"PHYSICAL",
                "sku":"SQ7959275",
                "productName":"MOONFALL sticker",
                "productDescription":"",
                "productUrl":"/store/moonfall-sticker",
                "quantity":1,
                "multipleQuantityAllowed":true,
                "unitPrice":{
                    "currencyCode":"USD",
                    "value":600,
                    "decimalValue":"6.00",
                    "fractionalDigits":2
                },
                "itemTotal":{
                    "currencyCode":"USD",
                    "value":600,
                    "decimalValue":"6.00",
                    "fractionalDigits":2
                },
                "variantOptions":[
                    {
                        "name":"category",
                        "value":"stickers/individual"
                    }
                ],
                "image":"",
                "isSubscribable":false
            },
            {
                "id":"5fbc8b4bc7afe470b54b8ad5",
                "productId":"5eba1d4a823c6d68cccb873a",
                "productType":"PHYSICAL",
                "sku":"SQ7346474",
                "productName":"YOUR HEART sticker",
                "productDescription":"",
                "productUrl":"/store/your-heart-sticker",
                "quantity":2,
                "multipleQuantityAllowed":true,
                "unitPrice":{
                    "currencyCode":"USD",
                    "value":500,
                    "decimalValue":"5.00",
                    "fractionalDigits":2
                },
                "itemTotal":{
                    "currencyCode":"USD",
                    "value":1000,
                    "decimalValue":"10.00",
                    "fractionalDigits":2
                },
                "variantOptions":[
                    {
                        "name":"category",
                        "value":"stickers/individual"
                    }
                ],
                "image":"",
                "isSubscribable":false
            }
        ],
        "shippingLocation":{},
        "shippingOptions":[],
        "discounts":[],
        "giftCards":[],
        "taxes":[],
        "subtotal":{"currencyCode":"USD","value":1600,"decimalValue":"16.00","fractionalDigits":2},
        "shippingTotal":{"currencyCode":"USD","value":0,"decimalValue":"0.00","fractionalDigits":2},
        "discountTotal":{"currencyCode":"USD","value":0,"decimalValue":"0.00","fractionalDigits":2},
        "taxTotal":{"currencyCode":"USD","value":0,"decimalValue":"0.00","fractionalDigits":2},
        "appliedGiftCardBalanceTotal":{
            "currencyCode":"USD",
            "value":0,
            "decimalValue":"0.00",
            "fractionalDigits":2
        },
        "grandTotal":{"currencyCode":"USD","value":1600,"decimalValue":"16.00","fractionalDigits":2},
        "amountDue":{"currencyCode":"USD","value":1600,"decimalValue":"16.00","fractionalDigits":2},
        "cartType":1,"shouldBlockPurchaseForMinimumOrderAmount":false
    },
    "storeCurrency":"USD",
    "continueShoppingLinkUrl":"store",
    "minimumOrderSubtotal":{"currency":"USD","value":"0.00"},
    "locale":"en-US",
    "useCldrMode":false
}

