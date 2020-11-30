# eec-for-squarespace
This is a project where I learn how to integrate/implement Google Analytics Enhanced Ecommerce tracking into a Squarespace store using nothing but Squarespace Code Injections and Google Tag Manager



## ENHANCED ECOMMERCE FUNNEL ACTIONS
1. Impressions (not actually an action)
	*	When a customer sees a product either on a store page, or as a related item on another product page in the "YOU MIGHT ALSO LIKE" section.

2. Impression Click
	*	When a customer clicks on a product they saw as an impression

3. Product Detail View
	*	When a customer clicks on a product to view that product's detail view. In some cases, a site may also have "Quick View" available (this could complicate implementation slightly)

4. Add To Cart
	*	When a customer adds an item to cart 
	*	*NOTE: This can happen from a product detail view OR if a modification is made to the number of items in the customer's cart while on the `/cart` page*

5. Remove From Cart
	*	When a customer removes an item from their cart 
	*	*NOTE: This only happens if a modification is made to the number of items in the customer's cart while on the `/cart` page*

6. Checkout
	*	When a customer initiates the checkout process. 
	*	*NOTE: This one is a little tricky with Squarespace (at least in the lower tiers of service) because Squarespace DOES NOT do Code Injections on their externally hosted secure checkout page. So we will only be able to send an EEC event when a customer clicks the "Checkout" button and then when they complete their transaction by landing on the "Order Complete" page. If they don't complete their transaction we won't know what they did on the checkout page. This cannot be fixed.*

7. Purchase
	*	When a customer completes a transaction and lands on the "Order Complete" page








---
---



## **NOTE ON COOKIES**

We will need to store cookies in order to persist certain details about each product/variant throughout the funnel.

*	CART PAGE: In the case of modifications made on the cart page, we will be missing `dimension6` (sku) and `dimension7` (stock availability) for each item/SKU.

*	ORDER COMPLETION PAGE: In the case of sending the final purchase event on the order completion page, we will be missing the `id`, `category`, `dimension6` and `dimension7` (sale status) for each SKU



# DATA STRUCTURES
## Builtin Variables Required
* {{Referrer}}


## Product / Product Variant Data Structures

* A product is the highest level data structure for any item for sale on a website
* PRODUCT DETAILS: The data structure must include at least the product's "productId", "productName", and "productCategory"
* VARIANT DETAILS
  * NO VARIANTS: In the case where it is not desireable to send any variant information, the `variants` object should be set to `[]`. This should be done in the case of a `eec.detail` view where a product has multiple variants because only the highest level product detail information should be sent for the detail view. The variant information will be sent along once the product is added to cart
  * 1 VARIANT: In any case where it is feasible, the product data structure should also contain one variant
  * MULTIPLE VARIANTS: At this point in time there doesn't seem to be a case where a product would be sent with multiple variants but it's possible there will be a case for this in the future

<script>
var productJSON = {
	'productId': alphanumeric String,
	'productName': String,
	'productCategory': String,
	// may want to add 'productPrice' but this is TBD
	'variants': List of variant Objects // CAN BE SET TO `[]` for `eec.detail` object
	[{
		'sku': alphanumeric String,
		'price': String (a 2 decimal Number cast as String),
		'unlimited': Boolean,
		'qtyInStock': Integer, // can be 0 if unlimited is true
		'onSale': Boolean
	}]
}
</script>



## Cart Item

* A cartItem is a reference to a row in the Cart Table on the "/cart/" page or 
* It describes the product/variant that is in the cart (represented by a productJSON) as well as the quantity of that product/variant currently in the cart

<script>
var cartItemJSON = {
	'quantityInCart': Number,
	'productJSON': productJSON
}
</script>




	
## Cookie Data Structure
The cookie's data structure will have the usual cookie keys:
  * name -- The cookie name `variantsAddedToCart`
  * value -- The value of the cookie will be a stringified JSON object with primary keys set to the SKU of each item/variant that has been added to the cart and primary values will be objects with `id`, `category`, `unlimited`, `qtyInStock`, and `onSale` as the second level key/value pairs
  * path -- Path of the cookie. If not set, defaults to the current path. so we should always set to `'/'`
  * domain -- Domain of the cookie. If not set, defaults to the current domain. so we should always set to `'cachetattoo.com'`
  * expires -- Expiration time of the cookie in milliseconds. If not set, defaults to Session. so we should always set to 28 days which is `2419200000` ms from now


**COOKIE VALUE EXAMPLE**
<script>
{
	'sku123' : {
		'id': string,
		'category': string,
		'unlimited': true/false,
		'qtyInStock': integer
		'onSale': true/false		
	}
}
</script>


Example of stringifying a JSON to set a cookie
<script>
(function(){
   	var myObject = JSON.parse('{
								"sku123": {
									"id": itemId, 
									"category": variantCategory,
									"unlimited": true/false,
									"qtyInStock": integer,
									"onSale": true/false
								}
							}');

	// modify object here if necessary

	// set up the necessary cookie values for each cookie key
   	var e = 'Thu Nov 26 2017 15:44:38';
   	var path = '/';
   	var domain = 'cachetattoo.com';
	
	// set the cookie with stringified object as main value and other key/value pairs set accordingly
   	document.cookie = 'myObj=' + JSON.stringify(myObject) + 
   						'; expires=' + e +
						'; path=' + path +
						'; domain=' + domain;
})()
</script>




# UTILITY FUNCTIONS
A `utility function` is a Custom Javascript Variable that returns a function that can be called by other Custom Javascript Variables. There are a few utility functions that will need to be implemented along with the main Custom Javascript Variables.












