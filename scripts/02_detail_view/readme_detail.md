# EXECUTION PLAN

**SQUARESPACE WORK**
1. Push ssRawProductDetailJSON to the data layer

Add code to Squarespace's Code Injection in the "Footer" section. This code will scrub the page for all scripts and find the one with the Squarespace Context object `Static.SQUARESPACE_CONTEXT`, which has all the product detail information

[How to scrape information from SS](https://stackoverflow.com/questions/58053572/scraping-information-from-a-script-tag-using-javascript/64887166#64887166)

then form that into an object with a key containing information to the object and a key containing informtion on the product variants and push this to dataLayer

```
            ssRawProductDetailJSON = {
                "item": ssContextObject.item,
                "product": ssContextObject.product
            };
```


**GTM WORK**
1. create a DL variable to hold the variable pushed from Squarespace -- `{{DL - SS Raw Product Detail JSON}}`

2. Write a script that takes this DL variable and generates a proper eec.detail object and uses a utility to add the "actionField" with "list" if appropriate

3. Create a utility function that will add the "actionField" with "list" that the user last viewed -- `{{JS Utility - add list from referrer}}` (NOTE: this utility relies on another utility to parse the URI of the referrer `{{JS Utility - parseURI}}`)