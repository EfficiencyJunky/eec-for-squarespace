# IMPLEMENTATION GUIDE FOR THE CART MODIFICATION LOGIC (GENERATES "ADD" OR "REMOVE" EEC OBJECTS ACCORDING TO MODIFICATION TYPE)

1. Setup a trigger that we will use to fire another custom HTML tag
    1. In the GTM "Triggers" section create a new trigger and name it `Dom Ready - Cart Page`
    2. For the "Trigger Configuration" choose "Dom Ready"
    3. Now choose "Some DOM Ready Events"
    4. Select "Page Path" in the first dropdown, "contains" in the second and then type in `/cart` to the text field
    5. Save the trigger


2. Setup a custom HTML Tag to to push raw cart data to dataLayer
    1. In the GTM "Tags" section, create a new tag name it `Custom HTML - push ssModifyCartItems to DL`
    2. For the "Tag Configuration" choose "Custom HTML"
    3. Copy [this code][01_datalayer_push_code] to the "HTML" section
    4. Now under "Triggering" choose the `Dom Ready - Cart Page` trigger we created in the previous step
    5. Save the tag
    6. To test this, re-start Preview mode in GTM, add a product to cart, and then visit the cart page. <br/>
    We should see the `ssRawModifyCartPush` event show up in the Summary tab. Click on this event and check the "Variables" tab. The `DL - SS Raw Modify Cart` variable should now be populated with a bunch of data.<br/>
    We should ALSO see the `initModifyCartTagInfo` event show up in the Summary tab. Click on this event and check the "Variables" tab. The `DL - EEC Modify - action`, `DL - EEC Modify - productName`, and `DL - EEC Modify - quantity` variables should now be initialized with "not_set", "not_set", and 0.<br/>
    If we change the quantity of one of the items in the cart, or remove it from the cart entirely, we should see two more events appear in the summary tab: `ssRawModifyCartPush` and `fireModifyCartTag`. we will use these in the next step.



3. Use a Custom Javascript Variable to transform the raw cart data into lists of `productJSON` objects, identify which items were modified and by what quantity, and then generate our `add` or `remove` EEC data structure according to the type of modification made to the cart (did they add or remove items?)
    1. Create a Custom Javascript Variable and name it `JS - eec.modify`
    2. Copy [this code][02_eec_object_creation_code] to the "Custom JavaScript" section
    3. Save the variable
    4. To test this, re-start Preview mode in GTM, add a product to cart and visit the cart page (or just visit the cart page if items are already in the cart)<br/>
    Now change the quantity of one of the items in the cart, or remove it from the cart entirely, we should see `ssRawModifyCartPush` and `fireModifyCartTag` appear again. Click on the `fireModifyCartTag` event and check the "Variables" tab.<br/>
    The `JS - eec.modify` variable should now be populated with either an `add` EEC object or a `remove` EEC object depending on if we added or removed items from the cart.<br/>
    The `DL - EEC Modify - action`, `DL - EEC Modify - productName`, and `DL - EEC Modify - quantity` variables should also have been filled in with their corresponding information.
    



**EEC ADD AND REMOVE DATA STRUCTURE REFERENCE**<br/>
This is an example of what the EEC data structure for actions of type `add` and `remove` look like.

```
{
  'ecommerce': {
    'add': {
      'products': [
        {
          'id': '399sdccsfjl8990933kkj3jkl3',
          'name': 'added product name',
          'category': 'categoryA/categoryB',
          'brand': 'Your Brand Name',
          'metric1': 12,
          'variant': 'option1|option2',
          'quantity': 2,
          'dimension5': 'SQ1234567',
          'price': '6.00',
          'dimension6': 'In Stock',
          'dimension7': 'On Sale'
        }
      ]
    }
  }
}


{
  'ecommerce': {
    'remove': {
      'products': [
        {
          'id': '44222adf0989dfdfdf9992kjkljkj',
          'name': 'removed product name',
          'category': 'categoryC/categoryD',
          'brand': 'Your Brand Name',
          'metric1': -30,
          'variant': 'option1|option2',
          'quantity': 3,
          'dimension5': 'SQ7654321',
          'price': '10.00',
          'dimension6': 'In Stock',
          'dimension7': 'Regular Price'
        }
      ]
    }
  }
}
```


[01_datalayer_push_code]: ./01_gtm_rawModifyCartPush.html
[02_eec_object_creation_code]: ./02_gtm_eecModifyObj.js
