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
The world of ecommerce is vast indeed. But it's surprisingly predictable in many ways. As you may have noticed, nearly every ecommerce website in existence today follows the exact same heirarchy and organizational structure. This is not by accident. Considering how many moving parts there are in a complete ecommerce solution, standardizing the website structure was an absolute necessity and hasn't changed in decades.

The point here being that understanding the structure of ecommerce websites is the first most important thing we all need to understand before diving head first into EEC tracking. Because EEC itself is structured around this standard way of doing things.

## LESSON #1: A Typical Ecommerce User Journey
What I'm talking about when I say "structure" of an ecommerce website is really how the website "flows" or how the "user journey" has been set up. Although this section may have you saying "Hellooooooo captain obvious!!" because we have all bought things online...it is important to frame things this way in order to understand EEC implementation.

Go to any ecommerce website and you will more than likely experience some form of this basic user journey:
1. **Enter The Store:** Usually we enter a store via the home page, a landing page from an advertisement, or search engine. The first page we see will likely have a collection of featured products (click to view details), nav-bar with product categories, and possibly a search bar or other search filtering capabilities.
2. **Browse:** Use the store's navigation tools. We might click on a category or use the search bar and advanced filters. Taking any of these actions will likely result in the display of another more specific collection of products.
3. **Click on a product:** When we click on a product we like! Usually this takes us to view the product's details page but not always.
4. **View a Product:** After we click on a product we are taken to its Product Details Page. This is how we learn more about a specific product. Taking this action will provide us with a focused view of the product and give us the ability to choose variants of that product such as "Size", "Color", etc.
5. **Add to Cart:** Click the "Add-To-Cart" button. This is analogous to putting an item in our grocery cart at a supermarket. We intend to purchase this item but may wish to keep browsing for others.
6. **Visit the Cart:** View the shopping cart to see all items we've added thus far. This is the last step before checkout. Here we can make our final decisions as to what we want to keep, what we want more or less of, what we want to get rid of entirely, or maybe we still want keep shopping.
7. **Modify the Cart:** Adjust the quantity of a single item or remove entire groups of items. Taking this action signals what we actually intend to purchase from the cart.
8. **Checkout:** Click the checkout button and enter the checkout flow. The checkout process is a whole beast unto itself and is the most complex and non-standard part of the user journey. More on that later. Generally though, this is where we enter our personal information, choose a shipping method, and choose our method of payment.
9. **Purchase Complete:** Once we've completed the transaction, we land on a "Transaction Complete" page. Assuming we've successfully completed all of the steps of the checkout, this is where we end up. On some sort of "Thank You" or summary page that lets us know just how much money we've sacrificed to the Gods of Ecommerce.


Each of the parts of the user journey I just outlined might come in slightly different flavors, or have a minor detour here or there, but this is essentially how ecommerce works in a nutshell. For example in step 3, the Product Detail View may also show a "related products" section or other information not specifically related to the product being viewed, but these components are usually just part of the **Browse** functionality of a website. There may also be promotions that pop up along the way or coupon codes to enter, but that's slightly outside the scope of this discussion. Ultimately ecommerce is about selling stuff and finding the most efficient method of doing so. Simplicity is key.



## LESSON #2: A Marketer's Guide to EEC Data Structures
This is where forcing yourself to read everything I just wrote will hopefully pay off. Because behind the scenes, every step of the user journey, or more accurately every "Action" a person takes (passive or active), can be described by a small set of data that we call a Data Structure. If you already have an in depth understanding of data structures feel free to skip this section, but if you don't...

STAY WITH ME :) Even if you don't consider yourself a "technical marketer" please don't be scared off by this use of technical lingo. It's honestly extremely important for any digital marketer in the ecommerce space (or any digital space) to at least understand the basics of how these data structures work. I guarantee you will be many times more effective in using Google Tag Manager or communicating with a developer if you do. The good news is, any well built data structure should be intuitive and easily understood. And EEC wouldn't have lasted so long if the data structures behind it weren't intuitive. Thanks Google ;)

In order to alleviate any fear you may have of the word "Data Structure", here's an example.

<script>
{
    'pageview': {
		'url': 'https://www.turnerkirk.com/',
		'protocol': 'https:'
		'hostname': 'www.turnerkirk.com',
		'pathname': "/",
    }
}
</script>

What do you see? A collection of information (**"data"**) in a **"structured"** form that humans can read or write code to manipulate, and computers can interpret or utilize to efficiently carry out tasks.

Looking at the above data structure, what do you think its purpose is? The simplest answer is, it describes an **event** called a **"pageview"**. And the pageview is described by its component parts `url`, `protocol`, `hostname`, `pathname`. 

Even if you don't understand the words used to name the components, you can look at the data structure and understand that it is a collection of information that describes the "pageview" event. And if you ever wanted to know the `pathname` of the pageview, you could simply ask the pageview for its pathname and it would respond with "/".

In code, we can ask a data structure what values are stored in its components with "dot notation". For the pageview, if we ask `pageview.pathname` it would respond with "/". If we ask `pageview.url` it would respond with "https://www.turnerkirk.com/". If we ask `pageview.yourmom` it would politely respond with "undefined", which is computer speak for "nice try ya silly goose!"

Now you might be telling yourself "but I'm not a coder". And while that doesn't need to change, you might just be curious enough at this point to open the "Javascript Console" in your browser, type in `document.URL`, and press enter. Or if you're really feeling crazy type in `document.location` and press enter. If it's your first time doing this, it's ok to have your mind blown. I still enjoy doing this from time to time.


## LESSON #3: Enhanced Ecommerce Data Structures
It should come as no surprise that Google has structured the technical implementation of Enhanced Ecommerce to directly mirror the Typical Ecommerce User Journey. Again. Efficiency. Oh how I love efficiency! And while not everything about Google makes complete sense (like the Google Ads UI for Universal App Campaigns), their EEC data structure is super simple, clean, and easily customized. Here's what I mean.

Google breaks down the user journey into a core set of "Actions" (aka events), each with a common data structure that only requires a small amount of information to function, but can be loaded up with a TON of information if you want to really supercharge your measurement capabilitis.

Let's take a look at the User Journey from the standpoint of Google's EEC Data Structures:

1. **Enter The Store:**<br/>
Whenever a customer enters your store, a few events occur, but here are the most relevant:
   1. **Pageview:** Yep. It's that simple. Pageviews are the backbone of all online activity measurement and it's no different here. Technically a pageview is not really part of the more specific EEC specification, but it is the cornerstone of Google Analytics. Also, a "pageview" in context of Google Analytics is a bit more detailed than the pageview example I gave earlier, but it's function is similar.
   2. **Product Impression:** Now THIS is the beginning of EEC specific Data Structures. Impressions aren't technically what Google calls an "Action" (impressions are passive) but they are a part of EEC nonetheless. I'm going to define a product impression as "anytime a person sees a picture or text representation of a product on your website that they can click to view a details page for that product". So in our User Journey this relates to when the person sees "a collection of featured products".

	The data structure for a product impression provides a description of all the products that were visible to the customer the pages they visit. It is literally just a list of product names and/or IDs with whatever additional metadata we want to send along. Here's an extremely simple yet totally valid example.

	```
	{
		'impressions': [
			{
				'id': '123ABC',
				'name': 'Name of Product 1',
			},
			{
				'id': 'DEF456',
				'name': 'Name of Product 2',
			},
			{
				'id': '7G8H9I',
				'name': 'Name of Product 3',
			}
		]
	}
	```

1. **Browse:**<br/>
Essentially the same as #1 but this time we will include a little more information about each product.<br/>
*Position:* The position on the page. Let's pretend the person clicked on the "Hats" button from the store's main page navigation and now they see a collection of 3 hats for sale. The hat positioned the highest on the page (position 1) is named "Tophat", the second highest "Bowler" and the third "Beanie". 
*Category:* This is slightly confusing because the 'category' can contain a hierarchy of categories that describe the product, not just a single category. So in our example, each of these hats is in the "hat" category, but each one also belongs to a subcategory of either "round" or "amorphous". This is what the data structure would look like.
	```
	{
		'impressions': [
			{
				'id': '12ll3j',
				'name': 'Tophat',
				'category': 'hats/round',
				'position': 1
			},
			{
				'id': 'sdfjkl223',
				'name': 'Bowler',
				'category': 'hats/round',
				'position': 2
			},
			{
				'id': '1304jjd',
				'name': 'Beanie',
				'category': 'hats/amorphous',
				'position': 3
			}
		]
	}
	```

1. **Click on a product:** This is where the data structure gets slightly more complicated but not much. Just one more tiny level of complexity. A "click" is what Google calls an "Action". The click action doesn't just describe a list of products like Impressions do. Rather it contains two sub-structures. One of which describe a little more about the action itself and the other describes the product(s) involved. Let's say the person clicks on the Beanie from our previous step. Here's what the data structure might look like.

```
{
    'click': {
		'actionField': {
			'list': 'Hats'
		},
		'products': [
			{
				'id': '1304jjd',
				'name': 'Beanie',
				'category': 'hats/amorphous',
				'position': 3
			}
		]
}
```

  * `actionField` tells us that the person was viewing the "Hats" Product List when they clicked
  * `products` tells us that the product they clicked on was the Beannie in position 3. 

  You may be asking "why is products plural?". The answer is because other Actions such as "checkout" and "purchase" might *actually* describe a list of products being checked out or purchased. So it makes sense to use a list for the product(s) described by an action because a list by definition can contain a single item OR many items. This means that our data structure can be re-used for different kinds of Actions. And THAT is literally the definition of efficiency!! MMM I LOVE IT SO MUCH!!!

1. **View a Product:** After we click on a product we are taken to its Product Details Page. This is how we learn more about a specific product. Taking this action will provide us with a focused view of the product and give us the ability to choose variants of that product such as "Size", "Color", etc.
<script>
</script>
5. **Add to Cart:** Click the "Add-To-Cart" button. This is analogous to putting an item in our grocery cart at a supermarket. We intend to purchase this item but may wish to keep browsing for others.
<script>
</script>
6. **Visit the Cart:** View the shopping cart to see all items we've added thus far. This is the last step before checkout. Here we can make our final decisions as to what we want to keep, what we want more or less of, what we want to get rid of entirely, or maybe we still want keep shopping.
<script>
</script>
7. **Modify the Cart:** Adjust the quantity of a single item or remove entire groups of items. Taking this action signals what we actually intend to purchase from the cart.
<script>
</script>
8. **Checkout:** Click the checkout button and enter the checkout flow. The checkout process is a whole beast unto itself and is the most complex and non-standard part of the user journey. More on that later. Generally though, this is where we enter our personal information, choose a shipping method, and choose our method of payment.
<script>
</script>
9. **Purchase Complete:** Once we've completed the transaction, we land on a "Transaction Complete" page. Assuming we've successfully completed all of the steps of the checkout, this is where we end up. On some sort of "Thank You" or summary page that lets us know just how much money we've sacrificed to the Gods of Ecommerce.
<script>
</script>





## IMPRESSIONS vs. ACTIONS
Google breaks the user journey into two parts, Impressions and Actions, and each of these parts has a slightly different way of structuring data.



## CATEGORY vs. LIST





### Squarespace Commerce Data Structures
Unfortunately, Squarespace did not call up Google before building out their ecommerce platform and ask how they should structure their databases. While I'd like to believe they had a reason to structure (or not structure) their data the way they have...I tend to believe that Squarespace "The Company" is somewhat fragmented in it's organizational structure and therefore so is the way they structure their data.





## LESSON #3: Enhanced Ecommerce Data Structures vs. Squarespace Commerce Data Structures
In a fight between data structures, who would win? Google or Squarespace? Well it's sort of a trick question because the answer is "they shouldn't be fighting in the first place!" If we want our ecommerce tracking to be successful so we can sell more stuff, they need to learn to play nice. Unfortunately the majority of our EEC implementation is essentially playing the role of the mediator. And this is one rocky relationship!





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
