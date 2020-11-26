# eec-for-squarespace
This is a project where I learn how to integrate/implement Google Analytics Enhanced Ecommerce tracking into a Squarespace store using nothing but Squarespace Code Injections and Google Tag Manager



Builtin Variables Required
* {{Referrer}}




# **COOKIE PLAN**

We will need to store cookies in order to persist certain details about each product/variant throughout the funnel.

CART PAGE: In the case of modifications made on the cart page, we will be missing `dimension6` and `dimension7` for each item/SKU

ORDER COMPLETION PAGE: In the case of sending the final purchase event on the order completion page, we will be missing the `id`, `category`, `dimension6` and `dimension7` for each SKU

	
## COOKIE DATA STRUCTURE
The cookie's data structure will have the usual cookie keys:
  * name -- The cookie name.
  * value --  Value for the cookie (a stringified JSON with our product data)
  * path -- Path of the cookie. If not set, defaults to the current path. so we should always set to `'/'`
  * domain -- Domain of the cookie. If not set, defaults to the current domain. so we should always set to `'cachetattoo.com'`
  * expires -- Expiration time of the cookie in milliseconds. If not set, defaults to Session. so we should always set to 28 days which is `2419200000` ms from now


COOKIE VALUE
The value of the cookie will be a stringified JSON object with primary keys set to the SKU of each item/variant that has been added to the cart and primary values will be objects with `id`, `category`, `unlimited`, `qtyInStock`, and `onSale` as the second level key/value pairs

```	
{
	'sku123' : {
		'id': string,
		'category': string,
		'unlimited': true/false,
		'qtyInStock': integer
		'onSale': true/false		
	}
}
```


Example of stringifying a JSON to set a cookie
```
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
```