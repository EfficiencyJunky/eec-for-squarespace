# EXECUTION PLAN
This is where things get REALLY weird ;)


**GTM WORK**
1. Create a custom javascript variable with a utility function that will scrape the current cart object from the document it is given and return only the most relevant information for the purposes of modifying the cart -- `{{JS Utility - get Cart JSON from script in document}}`

2. Create a custom javascript variable with a utility function that will take the above cart JSON, pull out the items list, and convert it to a trimmed down JSON with variant `sku` as primary keys and only the most useful information we'll need to generate the EEC object later. We will also be using the `addedProductDetails` cookie to fill in the information we can't scrub from our utility in Step #1 -- `{{JS Utility - convert cartJSON to trimmed item JSON}}`

3. Create a custom HTML tag that fires when a user visits the cart page
    
    This script will pull information on the current status of the cart as well as track updates to the cart and push the changes to dataLayer
	
    **The script MAY also need to add/modify any necessary cookies - unsure as of writing this**

    The first thing it will do is use the utility we created in step #1 to grab the current cart object and store a reference to it in a variable `oldCartJSON`

    Then we will monitor changes to the cart by creating a MutationObserver object that will watch the `"div.CartPage-container-3tQnb"` node for changes.

    The MutationObserver requires a callback function that will be called anytime a set of changes is detected in the DOM based on the options we initialize it with.

    In our case, when the observer detects a change, we only care if that change results in modification of the subtotal, or the cart is emptied.

    when either of these events occurs, we will create an XMLHttpRequest that loads the latest version of the "https://cachetattoo.com/cart" page and re-scrapes it for the latest cart object using the utility function we created in step #1
    
    Then we will push a snapshot of both the old and new cart objects to dataLayer (but trim them down first using the utility in step #2) using event key `ssRawModifyCartJSONPushed_gtm` for us to process and create either an eec.add or eec.Remove action event object

4.  Create a VERSION 1 dataLayer variable to store the object pushed in the last step called `{{DL - SS Raw Modify Cart JSON}}` -- NOTE: IT IS VERY IMPORTANT THAT THIS DATALAYER VARIABLE IS SET TO VERSION 1 (otherwise it will suffer from recursive merge and if items are removed from the cart, they will not appear to be removed from our variables)

5.  Create a custom javascript variable that will take the old/new cart, compare them, create the correct modified cart eec object (either eec.add or eec.remove)









## OBJECT REFERENCE

**DATA AVAILABLE IN THE RAW CART ITEMS ARRAY**
<script>
cart.items[0] = {
//    id: "5fbed54deaf37e3b648210d2",
//    image: {},
//    isSubscribable: false,
//    itemTotal: {
//        currencyCode: "USD",
//        decimalValue: "12.00",
//        fractionalDigits: 2,
//        value: 1200
//    },
//    multipleQuantityAllowed: true,
//    productDescription: "<p> product desc text </p>",
    productId: "5e90c5a40e8c31732d17f46c",
    productName: "soft girl creme",
//    productType: "PHYSICAL",
//    productUrl: "/store/soft-girl-creme",
    quantity: 2,
    sku: "SQ2502768",
    unitPrice:{
        currencyCode: "USD",
        decimalValue: "6.00",
        fractionalDigits: 2,
        value: 600,
    }
    variantOptions: [
        { name: "category", value: "prints/individual"}
    ]
}
</script>




**EXAMPLE OF MODIFIED CART OBJECT GENERATED IN STEP #2**
<script>
    // create our cleaned JSON object for each cart line item
    var cleanItem = {
        'itemId': rawItem.productId,
        'itemTitle': rawItem.productName,
        'itemCategory': rawItem.variantOptions[0].value,
        'variantDetails': {
            'price': rawItem.unitPrice.decimalValue,
            'quantityInCart': rawItem.quantity,
            //'sku': rawItem.sku,
            'unlimited': variantCookieData.unlimited, // get from cookie -- used for dimension6 -- "In Stock" or "Sold Out"
            'qtyInStock': variantCookieData.qtyInStock, // get from cookie -- used for dimension6 -- "In Stock" or "Sold Out"
            'onSale': variantCookieData.onSale // get from cookie -- used for dimension7 -- "Regular Price" or "On Sale"
        }
    }

    // add each itemJSON to the JSON containing all items in the cart using sku as top level key
    cleanItemsJSON[rawItem.sku] = cleanItem;  
    
    var 
</script>






**EXAMPLE OF EEC "ADD" AND "REMOVE" OBJECTS GENERATED IN STEP #5**
**EXAMPLE ADD OBJECT**
<script>
    // create our properly formatted enhanced ecommerce add object
    var eecAddObj = {
      'ecommerce': {
        'add': {
          'products': [{
            'id': itemId,
            'name': itemTitle,
            'category': variantDetails.optionValues[0].value,
            //variant: 'xyz', // maybe use this for sku instead of dimension
            'brand': {{const - eec brand}},
            'price': variantPrice.toFixed(2),
            'quantity': quantityAdded,
            'dimension5': variantDetails.sku,
            'dimension6': (variantDetails.unlimited || variantDetails.qtyInStock > 0) ? 'In Stock' : 'Sold Out',
            'dimension7': (!variantDetails.onSale) ? 'Regular Price' : 'On Sale',
            'metric1': subtotalAdded,                       
          }]
        }
      }
    }
</script>


**EXAMPLE REMOVE OBJECT**
<script>
    // create our properly formatted enhanced ecommerce remove object
    var eecRemoveObj = {
      'ecommerce': {
        'remove': {
          'products': [{
            'id': itemId,
            'name': itemTitle,
            'category': variantDetails.optionValues[0].value,
            //variant: 'xyz', // maybe use this for sku instead of dimension
            'brand': {{const - eec brand}},
            'price': variantPrice.toFixed(2),
            'quantity': quantityRemoved,
            'dimension5': variantDetails.sku,
            'dimension6': (variantDetails.unlimited || variantDetails.qtyInStock > 0) ? 'In Stock' : 'Sold Out',
            'dimension7': (!variantDetails.onSale) ? 'Regular Price' : 'On Sale',
            'metric1': subtotalRemoved,                       
          }]
        }
      }
    }
</script>