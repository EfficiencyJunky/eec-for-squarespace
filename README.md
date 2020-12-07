# eec-for-squarespace
This is a project where I learn how to integrate/implement Google Analytics Enhanced Ecommerce tracking into a Squarespace store using nothing but Squarespace Code Injections and Google Tag Manager

**RESOURCES**
* [Simo Ahava: The difinitive Enhanced Ecommerce guide for Google Tag Manager](https://www.simoahava.com/analytics/enhanced-ecommerce-guide-for-google-tag-manager/)
* [Simo Ahava: Product scoped custom dimensions and metrics](https://www.simoahava.com/gtm-tips/product-scoped-custom-dimensions-and-metrics/)
* [Simo Ahava: Two ways to persist data via Google Tag Manager](https://www.simoahava.com/analytics/two-ways-to-persist-data-via-google-tag-manager/)
* [Official Google Tag Manager Developer Guide for Enhanced Ecommerce](https://developers.google.com/tag-manager/enhanced-ecommerce)
* [Official Google Analytics Developer Guide for Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)
* [How to scrape Squarespace Commerce Analytics data from <script> tags in an <html> document](https://stackoverflow.com/questions/58053572/scraping-information-from-a-script-tag-using-javascript/64887166#64887166)



# THE GOOGLE ANALYTICS ENHANCED ECOMMERCE FUNNEL
1. **Impressions** (not an EEC action)
	*	When a customer sees a product either on a store page, or as a related item on another product page in the "YOU MIGHT ALSO LIKE" section.

2. **Impression Click**
	*	When a customer clicks on a product they saw as an impression

3. **Product Detail View**
	*	When a customer clicks on a product to view that product's detail view. In some cases, a site may also have "Quick View" available (this could complicate implementation slightly)

4. **Add To Cart**
	*	When a customer adds an item to cart 
	*	**NOTE:** *This can happen from a product detail view OR if a modification is made to the number of items in the customer's cart while on the `/cart` page*

5. **Remove From Cart**
	*	When a customer removes an item from their cart 
	*	**NOTE:** *This only happens if a modification is made to the number of items in the customer's cart while on the `/cart` page*

6. **Checkout**
	*	When a customer initiates the checkout process. 
	*	**NOTE:** *This one is a little tricky with Squarespace (at least in the lower tiers of service) because Squarespace DOES NOT do Code Injections on their externally hosted secure checkout page. So we will only be able to send an EEC event when a customer clicks the "Checkout" button and then when they complete their transaction by landing on the "Order Complete" page. If they don't complete their transaction we won't know what they did on the checkout page. This cannot be fixed.*

7. **Purchase**
	*	When a customer completes a transaction and lands on the "Order Complete" page

---
---
## CUSTOM DIMENSIONS AND METRICS
*	dimension4 	- SS Transaction ID
*	dimension5 	- SS SKU
*	dimension6 	- SS Availability - 'In Stock' : 'Sold Out'
*	dimension7 	- SS Sale Status - 'On Sale' : 'Regular Price'
*	metric1 	- Cart Value - The combined value of products added or removed from cart - Scope: Product -- Type: Currency (Decimal)


---
---




# DATA STRUCTURES
## productJSON -- Contains Product and Product Variant information

* A product is what we will call the highest level data structure for any item for sale on a website. NOTE: Squarespace often refers to this as an "item"
* PRODUCT DETAILS: The productJSON data structure must include at least the product's "productId" AND/OR "productName" AND "productCategory". In practice we will also include a variant.
* VARIANT DETAILS: The `variants` object in a productJSON contains a list of `variant` objects. Currently there is only ever 0 or 1 variant in the list but in the future we may need to add more
  * 0 VARIANTS: In the case where it is not desireable or possible to send any variant information, the `variants` object should be set to `[]`. This will most commonly occur in the case of a product impression or product click.
  * 1 VARIANT: In any case where it is feasible (any action in the funnel after Product Click), the variants list should contain one variant. In the case of a Product Detail View, we could leave the variants list set to `[]` since the Product Detail View describes a product that may contain multiple variants. But we can also send a single variant to describe the displayed characteristics of the product. To do this, we will set the `sku` == "not_added" and will have to figure out the proper values for `price`, `unlimited`, `qtyInStock` and `onSale` in order to create an `eec.detail` object that will send along the displayed characteristics of the product.
  * MULTIPLE VARIANTS: At this point in time there doesn't seem to be a case where a product would be sent with multiple variants but it's possible there will be a case for this in the future

<script>
var productJSON = {
	'productId': alphanumeric String,
	'productName': String,
	'productCategory': String,
	// may want to add 'productPrice' but this is TBD
	'variants': List of variant Objects // CAN BE SET TO `[]` for `eec.detail` object
	[{
		'sku': alphanumeric String, // either the sku of the variant or "not_added"
		'price': String (a 2 decimal Number cast as String),
		'unlimited': Boolean,
		'qtyInStock': Integer, // can be 0 if unlimited is true
		'onSale': Boolean
	}]
}
</script>


	
## Cookie Data Structure
We will need to store a cookie in order to persist certain details about each product/variant throughout the funnel.

*	CART PAGE: In the case of modifications made on the cart page, we will be missing  `dimension6` (stock availability) and `dimension7` (sale status) for each item/SKU.

*	ORDER COMPLETION PAGE: In the case of sending the final purchase event on the order completion page, we will be missing the `id`, `category`, `dimension6` and `dimension7` (sale status) for each SKU


The cookie's data structure will have the usual cookie keys:
  * name -- The cookie name `variantsAddedToCart`
  * value -- The value of the cookie will be a stringified JSON object with primary keys set to the SKU of each variant that has been added to the cart. Each object accessible by a variant SKU will contain the keys `pid`, `cat`, `unl`, `qty`, and `sal`. An example of the cookie value's data structure before being stringified is below.
  * path -- Path of the cookie. If not set, defaults to the current path. so we should always set to `'/'`
  * domain -- Domain of the cookie. If not set, defaults to the current domain. so we should always set to `'cachetattoo.com'`
  * expires -- Expiration time of the cookie in milliseconds. If not set, defaults to Session. so we should always set to 28 days which is `2419200000` ms from now


**COOKIE VALUE EXAMPLE**
<script>
{
	'abc123' : { // this key is set to the `sku` of one of the variants that's been added to cart
		'pid': string, // the productId
		'cat': string, // the productCategory
		'unl': true/false, // the variant's `unlimited` value -- helps calculate dimension6
		'qty': integer // the variant's `qtyInStock` value -- helps calculate dimension6
		'sal': true/false // the variant's `onSale` value -- helps calculate dimension7
	}
}
</script>




# VARIABLES

**Built-In Variables**
* {{Referrer}}
* {{Container ID}}
* {{Event}}
* {{Page Hostname}}

**URL Variables**<br/>
Component Type: Query
* {{URL Query - oid (for SS Transaction ID)}} -- Query Key: `oid`


**Constant Variables**
* {{const - eec brand}} -- Set this to the brand name you want to appear for your products


**1st Party Cookie Variables**
* {{Cookie - variantsAddedToCart}} -- Cookie Name: `variantsAddedToCart`

**Data Layer Variables**
Data Layer Version: 1
* {{DL - SS Raw Modify Cart}} -- Data Layer Variable Name: `ssRawModifyCart`

Data Layer Version: 2
* {{DL - SS Raw Product Detail}} -- Data Layer Variable Name: `ssRawProductDetail`
* {{DL - EEC Detail - Product Name}} -- Data Layer Variable Name: `ssRawProductDetail.item.title`
* {{DL - SS Raw Add To Cart}} -- Data Layer Variable Name: `ssRawAddToCart`
* {{DL - EEC Add - Quantity Added}} -- Data Layer Variable Name: `ssRawAddToCart.quantityAdded`
* {{DL - EEC Modify - action}} -- Data Layer Variable Name: `modifyCartTagInfo.action`
* {{DL - EEC Modify - productName}} -- Data Layer Variable Name: `modifyCartTagInfo.productName`
* {{DL - EEC Modify - quantity}} -- Data Layer Variable Name: `modifyCartTagInfo.quantity`
* {{DL - EEC Purchase - Order ID}} -- Data Layer Variable Name: `ssRawTransaction.orderNumber`
* {{DL - EEC Purchase - Revenue}} -- Data Layer Variable Name: `ssRawTransaction.grandTotal.decimalValue`
* {{DL - EEC Purchase - SS Transaction ID}} -- Data Layer Variable Name: `ssRawTransaction.id`
* {{DL - SS Raw Transaction}} -- Data Layer Variable Name: `ssRawTransaction`



**Custom Javascript Variables**
Variable Type: Custom Javascript
* {{JS - eec.add}}
* {{JS - eec.checkout}}
* {{JS - eec.detail}}
* {{JS - eec.modify}}
* {{JS - eec.purchase}}





# UTILITY FUNCTIONS
A `utility function` is a Custom Javascript Variable that returns a function that can be called by other Custom Javascript Variables. There are a few utility functions that will need to be implemented along with the main Custom Javascript Variables.

* {{JS Utility - add list from referrer}}
* {{JS Utility - convert rawCartItemsList to cartItemsJSON}}
* {{JS Utility - create eecObjectFromAction}}
* {{JS Utility - get cartItemsList from script in document}}
* {{JS Utility - parseURI}}
* {{JS Utility - setCookie}}
* {{JS Utility - Update cookie named variantsAddedToCart}}


---
---
# TRIGGERS
**Click - All Elements - Some Clicks**
* {{click - CHECKOUT button}} -- Page Path contains `/cart` AND Click Text contains `CHECKOUT`

**Custom Event**
* {{custom event - fireModifyCartTag}} -- Event Name: `fireModifyCartTag`
* {{custom event - ssRawAddToCartPush}} -- Event Name: `ssRawAddToCartPush`
* {{custom event - ssRawProductDetailPush}} -- Event Name: `ssRawProductDetailPush`
* {{custom event - ssRawTransactionPush}} -- Event Name: `ssRawTransactionPush`

**DOM Ready - Some DOM Ready Events**
* {{Dom Ready - Cart Page}} -- Page Path contains `/cart`
* {{Dom Ready - Store Pages}} -- Page Path contains `/store/`


---
---
# TAGS
## UPDATE EXISTING TAG
*	Google Analytics Pageview Tag - Assuming you've already setup the basic pageview tag that fires on all pages of your website, you will need to add a custom dimension to this tag by checking the `Enable overriding settings in this tag` box and then adding the Custom Dimension in the `Custom Dimensions` section, 
	Set the `Index` value to the number associated with the custom dimension that you've defined for the `SS Transaction ID` (in all of the examples this code is referencing this is `dimension4` so you would put `4` in the index section). 
	Set the value for the dimension to the `URL Query - oid (for SS Transaction ID)` variable. This will grab the Squarespace Transaction ID from the url of pages with the `oid` query parameter (which should only actually appear on pages who's path is `/checkout/order-confirmed`), and set dimension4 to this value for the pageview hit.




## CUSTOM HTML TAGS
*	{{Custom HTML - push ssModifyCartItems to DL}} -- Trigger: `Dom Ready - Cart Page`
*	{{Custom HTML - Push ssRawAddToCart to DL}} -- Trigger: `Dom Ready - Store Pages`




## EEC EVENT TAGS
1. **Product Detail View**
*	Category: `Ecommerce`
*	Action: `Product Detail View`
*	Label: `{{DL - EEC Detail - Product Name}}` (the name of the product)
*	Non-Interactioin Hit: `True`
*	More Settings -> Ecommerce: 
	*	Enable Enhanced Ecommerce Features: `True`
	*	Read Data from Variable: `{{JS - eec.detail}}`
*	Trigger: `custom event - ssRawProductDetailPush`

2. **Add To Cart**
*	Category: `Ecommerce`
*	Action: `Add To Cart`
*	Label: `{{DL - EEC Detail - Product Name}}`
*	Non-Interactioin Hit: `False`
*	More Settings -> Ecommerce: 
	*	Enable Enhanced Ecommerce Features: `True`
	*	Read Data from Variable: `{{JS - eec.add}}`
*	Trigger: `custom event - ssRawAddToCartPush`

3. **Modify Cart** -- Sends either `add` or `remove` EEC Actions depending on the modification
*	Category: `Ecommerce`
*	Action: `Modify Cart`
*	Label: `{{DL - EEC Modify - action}}: {{DL - EEC Modify - productName}}`
*	Value: `{{DL - EEC Modify - quantity}}`
*	Non-Interactioin Hit: `False`
*	More Settings -> Ecommerce: 
	*	Enable Enhanced Ecommerce Features: `True`
	*	Read Data from Variable: `{{JS - eec.modify}}`
*	Trigger: `custom event - fireModifyCartTag`

4. **Checkout**
*	Category: `Ecommerce`
*	Action: `Checkout`
*	Label: `Checkout {number of items} {value}`
*	Non-Interactioin Hit: `False`
*	More Settings -> Ecommerce: 
	*	Enable Enhanced Ecommerce Features: `True`
	*	Read Data from Variable: `{{JS - eec.checkout}}`
*	Trigger: `click - CHECKOUT button`

5. **Purchase**
*	Category: `Ecommerce`
*	Action: `Purchase`
*	Label: `Order ID: {{DL - EEC Purchase - Order ID}}`
*	Value: `{{DL - EEC Purchase - Revenue}}`
*	Non-Interactioin Hit: `True`
*	More Settings -> Ecommerce: 
	*	Enable Enhanced Ecommerce Features: `True`
	*	Read Data from Variable: `{{JS - eec.purchase}}`
*	Trigger: `custom event - ssRawTransactionPush`
