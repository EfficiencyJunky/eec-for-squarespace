// this function takes the raw Add To Cart JSON and converts it into a properly formatted Enhanced Ecommerce "add" object and the actionField 'list' if applicable
function(){

  // first check to make sure something didn't go wrong in the formation of this object
  if({{DL - SS Raw Add To Cart JSON}} == undefined){
        return undefined;    
  }

  var productJSON = {{DL - SS Raw Add To Cart JSON}}.productJSON;
  var quantityAdded = {{DL - SS Raw Add To Cart JSON}}.quantityAdded;

  var eecAddObj = {{JS Utility - create eecObjectFromAction}}('add', productJSON, quantityAdded);

  // add the actionField with list key/value based on the referrer
  // this function will only add the list if the referrer was actualy one with a list
  {{JS Utility - add list from referrer}}(eecAddObj, 'add', {{Referrer}});	
  
  
  // return our properly formatted enhanced ecommerce add event object
  return eecAddObj;

}