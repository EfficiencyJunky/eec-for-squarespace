/**
 * A Utility function that does the job of converting a productJSON object or a list of productJSON objects and (optional quantity or list of quantities) into a properly formatted EEC object
 * 
 * @param {String} eecAction the type of EEC object we want to create. can be "detail", "add", "remove", "checkout", or "purchase"
 * @param {Object} productJSON an individual productJSON object for any eecAction involving a single product ("detail", "add", "remove") or list of productJSON objects for any eecAction involving a list of products ("checkout", "purchase")
 * @param {Number} quantity a single number or list of numbers relating to the quantity of products to be considered for the corresponding productJSON object or list. only required for eecActions of type "add", "remove", "checkout", and "purchase"
 * @returns {Object} the properly formated EEC object
 */

function(){

    return function(eecAction, productJSON, quantity){
        
        // cast the productJSON and quantity to an array if they are single objects
        productJSON = (Array.isArray(productJSON)) ? productJSON : [productJSON];
        quantity    = (Array.isArray(quantity)) ? quantity : [quantity];

        // initialize our ecommerce object
        var ecommerceObj = {};

        // create our properly formatted enhanced ecommerce object with empty product list
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
                //variant: 'xyz', // need to implement this although the SKU in dimension5 does sort of provide this information already
                'brand': {{const - eec brand}}
            }

            // add variant details for the steps that actually have variants
            if(productJSON[j].variants.length > 0){

                variant = productJSON[j].variants[0];

                switch(eecAction){
                    case "add":
                    case "remove":
                        eecProduct['metric1'] = Number(variant.price) * quantity;
                    case "checkout":
                    case "purchase":    
                        eecProduct['quantity'] = Math.abs(quantity[j]);
                        eecProduct['dimension5'] = variant.sku;
                    case "detail":
                        eecProduct['price'] = variant.price;         
                        eecProduct['dimension6'] = (variant.unlimited || variant.qtyInStock > 0) ? 'In Stock' : 'Sold Out';
                        eecProduct['dimension7'] = (variant.onSale) ? 'On Sale' : 'Regular Price';
                    
                    default:
                        break;
                }
            }

            // push each formatted product object to the list of products
            ecommerceObj[eecAction].products.push(eecProduct);
        }

        // return our ecommerce object wrapped inside an object with single 'ecommerce' key
        return { 'ecommerce': ecommerceObj };
        

    }
}