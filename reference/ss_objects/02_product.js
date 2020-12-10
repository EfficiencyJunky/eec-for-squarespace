// we can find the Static.SQUARESPACE_CONTEXT object by scraping the DOM before the DOM.Ready event
// we can also access this variable AFTER DOM.Ready simply by accessing Static.SQUARESPACE_CONTEXT

var Static = {};

Static["SQUARESPACE_CONTEXT"] = {
    "item": {
        "title": "regular price unlimited stock product",
        "id": "5fcd65ae3ff1011540045eda",
        "fullUrl": "/store/regular-price-unlimited-stock-product",
        "publicCommentCount": 0,
        "commentState": 1,
        "recordType": 11
    },
    "itemId": "5fcd65ae3ff1011540045eda",
    "product": {
        "variantAttributeNames": [
            "size",
            "color"
        ],
        "variants": [
            {
                "id": "53661187-50e4-4aed-af51-40d5c7083afd",
                "sku": "SQ8858424",
                "price": {
                    "currencyCode": "USD",
                    "value": 500,
                    "decimalValue": "5.00",
                    "fractionalDigits": 2
                },
                "salePrice": {
                    "currencyCode": "USD",
                    "value": 0,
                    "decimalValue": "0.00",
                    "fractionalDigits": 2
                },
                "onSale": false,
                "stock": {
                    "unlimited": true   
                },
                "attributes": {
                    "color": "black",
                    "size": "small"
                },
                "shippingWeight": {"value": 0,"unit": "POUND"
                },
                "shippingSize": {"unit": "INCH", "width": 0, "height": 0, "len": 0},
            },
            {
                "id": "2d1324ba-ce05-4def-b88d-fb6dcc5eae66",
                "sku": "SQ6393698",
                "price": {
                    "currencyCode": "USD",
                    "value": 500,
                    "decimalValue": "5.00",
                    "fractionalDigits": 2
                },
                "salePrice": {
                    "currencyCode": "USD",
                    "value": 0,
                    "decimalValue": "0.00",
                    "fractionalDigits": 2
                },
                "onSale": false,
                "stock": {
                    "unlimited": true
                },
                "attributes": {
                    "color": "white",
                    "size": "large"
                },
                "shippingWeight": {"value": 0, "unit": "POUND"},
                "shippingSize": {"unit": "INCH", "width": 0, "height": 0, "len": 0},
            }
        ],
        "subscribable": false,
        "productType": 1
    }
};



// this is a version with only one variant and physical dimensions NOT set
Static["SQUARESPACE_CONTEXT"] = {
    "item": {
        "commentState": 1,
        "fullUrl": "/store/moonfall-sticker",
        "id": "5eba1a2b98f2a93833214793",
        "publicCommentCount": 0,
        "recordType": 11,
        "title": "MOONFALL sticker"
    },
    "itemId": "5eba1a2b98f2a93833214793",
    "product": {
        "productType": 1,
        "subscribable": false,
        "variantAttributeNames": [
            "category"
        ],
        "variants": [
            {
                "attributes": {
                    "category": "stickers/individual"
                },
                "id": "b3b44c1f-ca26-4787-879e-e7da1a3e326e",
                "onSale": false,
                "price":{
                    "currencyCode": "USD",
                    "decimalValue": "6.00",
                    "fractionalDigits": 2,
                    "value": 600
                },
                "salePrice":{
                    "currencyCode": "USD",
                    "decimalValue": "0.00",
                    "fractionalDigits": 2,
                    "value": 0
                },
                "shippingSize": {"unit": "INCH", "width": 0, "height": 0, "len": 0},
                "shippingWeight": {"value": 0, "unit": "POUND"},
                "sku": "SQ7959275",
                "stock":{
                    "unlimited": true
                }
            }
        ]
    }
};