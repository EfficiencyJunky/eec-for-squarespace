function(){

    return function(eecAction, productJSON, quantity){
        
        // cast the productJSON and quantity to an array if they are single objects
        productJSON = (Array.isArray(productJSON)) ? productJSON : [productJSON];
        quantity    = (Array.isArray(quantity)) ? quantity : [quantity];

        // initialize our ecommerce object
        var ecommerceObj = {};

        // create our properly formatted enhanced ecommerce object with empty prodcts list
        ecommerceObj[eecAction] = {
            'products': []
        }

        // declare variables to be replaced each loop
        var j, variant, eecProduct;

        // loop through all the products in the productJSON list object
        // for most eecActions this will only be a single item
        for(j=0; j < productJSON.length; j++){

            // create our basic eecProduct
            eecProduct = {
                'id': productJSON[j].productId,
                'name': productJSON[j].productName,
                'category': productJSON[j].productCategory,
                //variant: 'xyz', // maybe use this for sku instead of dimension
                //'brand': {{const - eec brand}},
                'brand': 'brand placeholder'
            }

            // add variant details for the steps that actually have variants
            if(productJSON[j].variants.length > 0){

                variant = productJSON[j].variants[0];

                switch(eecAction){
                    case "add":
                    case "remove":
                        // add metric1
                        eecProduct['metric1'] = Number(variant.price) * quantity;
                    case "checkout":
                    case "purchase":    
                        eecProduct['quantity'] = Math.abs(quantity[j]);
                    case "detail":
                        eecProduct['price'] = variant.price;         
                        eecProduct['dimension5'] = variant.sku;
                        eecProduct['dimension6'] = (variant.unlimited || variant.qtyInStock > 0) ? 'In Stock' : 'Sold Out';
                        eecProduct['dimension7'] = (!variant.onSale) ? 'Regular Price' : 'On Sale';
                    default:
                        break;
                }
            }

            ecommerceObj[eecAction].products.push(eecProduct);
        }

        // return our ecommerce object wrapped inside an object with single 'ecommerce' key
        return { 'ecommerce': ecommerceObj };
        

    }
}