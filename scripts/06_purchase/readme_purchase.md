# EXECUTION PLAN

**SQUARESPACE WORK**
1. Push rawSquarespaceTransaction JSON to the data layer -- [How to scrape information from SS](https://stackoverflow.com/questions/58053572/scraping-information-from-a-script-tag-using-javascript/64887166#64887166)

VERSION 1 -- Use Squarespace's Code Injection in the "Order Confirmation Page" section. Add a script that scrapes the HTML to find a Squarespace Commerce script where the entire SS Commerce object is exposed. Turn this into a JSON object and push it to the dataLayer in its raw form with a unique event key

*OR THE NOT RECOMMENDED BUT STILL FEASIBLE WAY*

VERSION 2 -- In GTM, create a custom HTML tag that fires on Dom Ready and access the Squarespace commerce transaction object from the DOM.

It looks like this: `Y.Squarespace.CommerceAnalytics._yuievt.events["commerceTrack:commerce-checkout-confirmed"].details[0];`

Then push the rawJSON to dataLayer with a unique event key

**GTM WORK**

1. Create a dataLayer variable in GTM that exposes the pushed Raw Transaction object `{{DL - SS Raw Transaction JSON}}`

2. Create a Custom Javascript variable in GTM that takes this JSON and converts it into the correct "purchase" object that Enhanced Ecommerce can use `{{JS Utility - createEECPurchaseObj from rawJSON}}`

3. Create 3 dataLayer variables
	1. {{DL - Order ID}} -- grabs the order ID from `rawJSON.orderNumber`
	2. {{DL - Purchase Revenue}} -- grabs the total purchase value from `rawJSON.grandTotal.decimalValue`
	3. {{DL - SS Transaction ID}} -- grabs the ss transaction ID from `rawJSON.id`

4. Create a Custom Dimension in GA with Hit Scope for `SS Transaction ID`

5. Create a trigger that fires when the Squarespace event key in step 1 is detected in the dataLayer

6. Create a tag that fires on this trigger and sends an event hit to GA with custom dimension for SS Transaction ID and Enhanced Ecommerce enabled with data from custom Javascript in Step 2





## OBJECT REFERENCE


**EXAMPLE OF PURCHASE OBJECT**
<script>
	// COOKIE LOGIC
	// -- id
	// -- category
    // -- dimension6
    // -- dimension7    

    // create our properly formatted enhanced ecommerce add object
    var purchase = {
      'ecommerce': {
        'purchase': {
          'products': [{
//            'id': itemId,
            'name': itemTitle,
//            'category': variantDetails.optionValues[0].value,
            //variant: 'xyz', // maybe use this for sku instead of dimension
            'brand': {{const - eec brand}},
            'price': variantPrice.toFixed(2),
            'quantity': quantityAdded,
            'dimension5': variantDetails.sku,
//            'dimension6': (variantDetails.unlimited || variantDetails.qtyInStock > 0) ? 'In Stock' : 'Sold Out',
//            'dimension7': (!variantDetails.onSale) ? 'Regular Price' : 'On Sale',
          }]
        }
      }
    }
</script>
























