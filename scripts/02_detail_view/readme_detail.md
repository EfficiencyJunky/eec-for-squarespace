# EXECUTION PLAN

**SQUARESPACE WORK**
1. Generate a raw object for the product details on any Product Detail View page and send to dataLayer with event key `ssRawProductDetailPushed_ss` and variable key `ssRawProductDetail`
    Add a script to Squarespace's Code Injection in the "Footer" section that will run on any page containing "/store/" + at least one character after the slash. 
    
    This script will scrub the page for all scripts and find the one with the Squarespace Context object `Static.SQUARESPACE_CONTEXT`, which has all the product detail information

    [How to scrape information from SS](https://stackoverflow.com/questions/58053572/scraping-information-from-a-script-tag-using-javascript/64887166#64887166)

    then this object will be modified to remove the mainImage object (since it's made up of a bunch of weird characters), then it will be split and loaded into an object with a key containing information to the parent product (`item` in the squarespace context object) and a key containing informtion on the product variants (`product` in the context object)

<script>
            ssRawProductDetail = {
                "item": ssContextObject.item,
                "product": ssContextObject.product
            };
</script>

    this is pushed to the dataLayer with event `ssRawProductDetailPushed_ss`


**GTM WORK**
1. create a DL variable to hold the variable pushed from Squarespace -- `{{DL - SS Raw Product Detail}}`

2. Create a Custom Javascript Variable called `JS - eec.detail`, with a function that that transforms the Raw Product Detail information in dataLayer into a proper `eec.detail` object that can be sent along with an event tag
    
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
          'id': '5e90c5a40e8c31732d17f46c',
          'name': 'soft girl creme',
          'category': 'prints/individual',
          'brand': 'Cache',
          'price': '6.00',
          'dimension5': 'SQ2502768',
          'dimension6': 'Sold Out',
          'dimension7': 'On Sale'
        }
      ],
      actionField: {list: 'All'}
    }
  }
}

</script>

