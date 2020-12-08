# EXECUTION PLAN

[these are reference variables]: just so you know
[01_datalayer_push_code]: ./01_ss_rawProductDetailPush.html
[02_eec_object_creation_code]: ./02_gtm_eecDetailObj.js


1. Implement a SS Code Injection script to push raw data to dataLayer
  1. In Squarespace, navigate to "Settings -> Advanced -> Code Injection" 
  2. Copy [this code][01_datalayer_push_code] to the "Footer" section BELOW the GTM container snippet
  3. Find the line of code just below the opening `<script>` tag that looks like this `var storePageName = "store";`
  4. change the word between the quotes (currently set to `store`) to the URL path name of your store (whatever you named it in your Squarespace "Pages" section)
  5. click "save" to save the changes
  6. back in GTM, use Preview mode to test if it's working. Anytime we visit a product detail page, we should see the event `ssRawProductDetailPush` show up in the Summary tab and the DataLayer variable `DL - SS Raw Product Detail` we created previously should populate. This information is being pulled directly from the `Static.SQUARESPACE_CONTEXT` object which you can inspect using your browser's console.

2. Create a Custom Javascript Variable to transform the raw data into a `productJSON` and generate `detail` EEC data structure
  1. Create a Custom Javascript Variable and name it `JS - eec.detail`
  1. Copy [this code][02_eec_object_creation_code] to the "Custom JavaScript" section 







    1. grab a reference to the DL variable made in Step 1
    2. pull out the relevant information to create a `productJSON` structure for the product being viewed
        IMPORTANT NOTE: if more than one product variant is being offered, the `variants` array should be set to `[]` so that the variant information is only sent along when one has been chosen and added to cart
    3. create a basic eec `detail` object using the `{{JS Utility - create eecObjectFromAction}}` function
    4. Add the `actionField` with `list` key (refers to the product list that the user last viewed) using the `{{JS Utility - add list from referrer}}` function




**EEC DETAIL OBJECT REFERENCE**
<script>

{
  'ecommerce': {
    'detail': {
      'products': [
        {
          'id': '399sdccsfjl8990933kkj3jkl3',
          'name': 'product name',
          'category': 'first/second',
          'brand': 'Your Brand Name',
          'price': '6.00',
          'dimension5': 'SQ1234567',
          'dimension6': 'In Stock',
          'dimension7': 'On Sale'
        }
      ],
      actionField: {list: 'Camping'}
    }
  }
}

</script>












