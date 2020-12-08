# ENHANCED ECOMMERCE FOR SQUARESPACE
## Welcome
The Enhanced Ecommerce (EEC) features of Google Analytics are an incredibly powerful set of tools for tracking and analyzing customer behavior in online stores. Over the past decade EEC has become the defacto tool for ecommerce measurement due to its comprehensive customization abilities and because it doesn't cost money. If set up correctly, it can provide a wealth of information on how your customers are progressing through the user journey from arrival at your store through purchase conversion and beyond.

That being said, it is NOT an "out-of-the-box" type solution to all your ecommerce woes that you can simply just "turn-on" (although it seems this way in Google Analytics). It requires a decent amount of planning, implementation, and customization to set it up properly for your specific business no matter what ecommerce platform you use. Squarespace is no different. That's just the nature of anything worth doing!

Thankfully we have some amazing tools like Google Tag Manager and Github to make this process as easy as possible.

## Why this repository exists
The goal of this repository is three-fold:
1. Provide a [complete guide](./guide/) for setting up the most important functions of EEC on Squarespace
2. Be an educational resource for anyone, regardless of their skill in coding OR marketing, to learn more about EEC and the tools available to implement it
3. Provide a [place for people to connect](https://github.com/EfficiencyJunky/eec-for-squarespace/discussions) and discuss all things related to EEC on squarespace


## Additional Resources
**SIMO AHAVA**<br/>
Simo Ahava is one of the world's leading experts (if not the leading one) on Google Tag Manager among other Google Properties. He's also a prolific blogger. We are very lucky to have him. If you are just getting started with GTM and EEC, I strongly encourage you read through as much of his blog as possible.

Here are the most relevant of his articles:
* [Simo Ahava: The difinitive Enhanced Ecommerce guide for Google Tag Manager](https://www.simoahava.com/analytics/enhanced-ecommerce-guide-for-google-tag-manager/)
* [Simo Ahava: Product scoped custom dimensions and metrics](https://www.simoahava.com/gtm-tips/product-scoped-custom-dimensions-and-metrics/)
* [Simo Ahava: Two ways to persist data via Google Tag Manager](https://www.simoahava.com/analytics/two-ways-to-persist-data-via-google-tag-manager/)

<br/>

**MEASURESCHOOL AND MEASUREMENTMARKETING.IO**<br/>
If you are looking to learn EVERYTHING there is to know about Google Analytics, Google Tag Manager, Google Data Studio, Google Search Console, Google Optimize, and in general become the best measurement marketer possible, then you absolutely MUST check out Measure School and MeasurementMarketing.io. Both of them offer lots of free content on their YouTube channels but if you are serious about this profession you should give them all your money. It will be a great investment<br/>

* MeasureSchool with Julian Juenemann
  * [measureschool.com](https://measureschool.com/)
  * [MeasureSchool on YouTube](https://www.youtube.com/channel/UClgihdkPzNDtuoQy4xDw5mA)
* MeasurementMarketing.io with Chris Mercer
  * [measurementmarketing.io](https://measurementmarketing.io/)
  * [MeasurementMarketing on YouTube](https://www.youtube.com/c/MeasurementMarketingio/videos)


**OFFICIAL GOOGLE DEVELOPER DOCS**<br/>
* [Official Google Tag Manager Developer Guide for Enhanced Ecommerce](https://developers.google.com/tag-manager/enhanced-ecommerce)
* [Official Google Analytics Developer Guide for Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce)

**OTHER**
* [How to scrape Squarespace Commerce Analytics data from <script> tags in an <html> document](https://stackoverflow.com/questions/58053572/scraping-information-from-a-script-tag-using-javascript/64887166#64887166)


---
# THE GUIDE
If you already understand how EEC works, are familiar with Google Tag Manager (GTM), and understand at least the basics of Javascript, or you just want to dive in, feel free to click the "GET STARTED" link below.

If you are new to the world of Ecommerce, or any of the other things I just mentioned, consider reading further before jumping into the guide.

## [GET STARTED](./guide/)


---
# HOW EEC WORKS IN GENERAL




















---
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

## CUSTOM HTML TAGS
*	{{Custom HTML - push ssModifyCartItems to DL}} -- Trigger: `Dom Ready - Cart Page`



**Custom Javascript Variables**
Variable Type: Custom Javascript
* {{JS - eec.purchase}}





# UTILITY FUNCTIONS


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








## EEC EVENT TAGS
