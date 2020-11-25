1. Push rawSquarespaceTransaction JSON to the data layer -- [How to scrape information from SS](https://stackoverflow.com/questions/58053572/scraping-information-from-a-script-tag-using-javascript/64887166#64887166)
VERSION 1 -- Use Squarespace's Code Injection in the "Order Confirmation Page" section.
Add a script that scrapes the HTML to find a Squarespace Commerce script where the entire SS Commerce object is exposed. Turn this into a JSON object and push it to the dataLayer in its raw form with a unique event key
*OR*
VERSION 2 -- Use a custom HTML tag that fires on Dom Ready in GTM and access the actual Squarespace commerce transaction object from the DOM. then push the rawJSON to dataLayer with a unique event key
2. In GTM create a Custom Javascript variable that takes this JSON and converts it into the correct "purchase" object that Enhanced Ecommerce can use `{{JS Utility - createEECPurchaseObj from rawJSON}}`
3. Create 3 dataLayer variables
	1. {{DL - Order ID}} -- grabs the order ID from `rawJSON.orderNumber`
	2. {{DL - Purchase Revenue}} -- grabs the total purchase value from `rawJSON.grandTotal.decimalValue`
	3. {{DL - SS Transaction ID}} -- grabs the ss transaction ID from `rawJSON.id`
4. Create a Custom Dimension in GA with Hit Scope for `SS Transaction ID`
5. Create a trigger that fires when the Squarespace event key in step 1 is detected in the dataLayer
6. Create a tag that fires on this trigger and sends an event hit to GA with custom dimension for SS Transaction ID and Enhanced Ecommerce enabled with data from custom Javascript in Step 2