# EXECUTION PLAN
For this step we need to do something totally different.


**GTM WORK**
1. Setup a custom HTML Tag to fire on DOM Ready that that attaches an event Listener to the Squarespace Commerce Analytics event "commerce-item-added". 
   
   The reason we want to use this event is because it will only fire when the item is successfully added to cart. (there are situations where clicking the "Add To Cart" button might produce an error so we'll let Squarespace handle that for us ;)
   
   Whenever this event is successfully fired we will grab the `e.newlyAdded` object from the event as well as the value in the `Quantity` <input> box and push this raw data to dataLayer with event key `ssRawAddToCartJSONPushed_gtm`

   *COOKIE LOGIC* -- We will also need to add the ID, Category, dimension6 and dimension7 to a cookie that the other steps in the process can access later

2. create a DL variable to hold the variable pushed from our HTML tag -- `{{DL - SS Raw Add To Cart JSON}}`

3. Write a script that takes this DL variable and generates a proper eec.add object and uses our utility to add the "actionField" with "list" if the referrer was one of the store lists





<script>
// Item that is IN STOCK and REGULAR PRICE
{
  itemDetails: {
    id: '5fbf33439d7936484081fc71',
    item: {price: {currency: 'USD', value: '6.00'}},
    itemId: '5eba1a2b98f2a93833214793',
    quantity: 1,
    title: 'MOONFALL sticker',
    purchasePriceCents: 600,
    nonSalePriceCents: 600,
    chosenVariant: {
      optionValues: [
        {optionName: 'category', value: 'stickers/individual'}
      ],
      id: 'b3b44c1f-ca26-4787-879e-e7da1a3e326e',
      sku: 'SQ7959275',
      price: 600,
      salePrice: 0,
      onSale: false,
      unlimited: true,
      qtyInStock: 0,
      width: 0,
      height: 0,
      weight: 0,
      len: 0
    },
    productType: 1,
    subTotal: 600
  },
  quantityAdded: '1'
}
</script>



<script>
// item that is IN STOCK and ON SALE
{
  itemDetails: {
    id: '5fbf3499cb3e0f57714368bb',
    item: {price: {currency: 'USD', value: '8.00'}},
    itemId: '5e90c5a40e8c31732d17f46c',
    quantity: 1,
    title: 'soft girl creme',
    purchasePriceCents: 600,
    nonSalePriceCents: 800,
    chosenVariant: {
      optionValues: [
        {optionName: 'category', value: 'prints/individual'}
      ],
      id: 'f85fb53b-01ea-441a-a023-7517c5480f5a',
      sku: 'SQ2502768',
      price: 800,
      salePrice: 600,
      onSale: true,
      unlimited: false,
      qtyInStock: 2,
      width: 0,
      height: 0,
      weight: 0,
      len: 0
    },
    productType: 1,
    subTotal: 600
  },
  quantityAdded: '1'
}
</script>