function(){

    return function(eecAction, productJSON, quantity){

        var variant = productJSON.variants[0];

        var eecProduct = {
            'id': productJSON.productId,
            'name': productJSON.productName,
            'category': productJSON.productCategory,
            //variant: 'xyz', // maybe use this for sku instead of dimension
            'brand': {{const - eec brand}},
            'price': variant.price,
            'quantity': Math.abs(quantity),
            'dimension5': variant.sku,
            'dimension6': (variant.unlimited || variant.qtyInStock > 0) ? 'In Stock' : 'Sold Out',
            'dimension7': (!variant.onSale) ? 'Regular Price' : 'On Sale'
        }


        if(eecAction === "eecProduct"){
            return eecProduct;
        }
        else if(eecAction === "add" || eecAction === "remove"){
            
            // add metric1
            eecProduct['metric1'] = Number(variant.price) * quantity

            var eecObj = {'ecommerce': {}};

            // create our properly formatted enhanced ecommerce object
            eecObj.ecommerce[eecAction] = {
                'products': [ eecProduct ]
            }

            return eecObj;
        }

    }
}