/**
 * A Utility function that takes in an EEC object and adds the "actioinField" key with a value of { 'list': listName } where 'listName' is derived from the "category" URL query parameter that it gets out of the fullReferrer String. If the query parameter doesn't exist, the listName is set to "unset".
 * 
 * @param {Object} eecObj a reference to the properly formatted EEC object we want to add an "actionField" with a value of { 'list': listName } 
 * @param {String} eecAction the key for the action of our EEC object 
 * @param {String} fullReferrer the refering URL that presumably has the category URL query parameter
 * @returns nothing
 */

//oes not return anything
function(){

    return function(eecObj, eecAction, fullReferrer){
      
      // if there wasn't a referrer then return
      if(fullReferrer == '' || fullReferrer == undefined){
        return;      
      }
      
      // parse the referrer URI using this handy utility function
      var parsedURI = {{JS Utility - parseURI}}(fullReferrer);
      
      // if the referrer host wasn't from cachetattoo.com then return
      if(!parsedURI.host.match("cachetattoo.com")){      
        return;      
      }
      
      // if the referrer path wasn't from the store page then we don't care because there aren't any other pages with lists on this website
      if(!parsedURI.path.match(/^\/store($|\/$)/) ){
        return;   
      }
      
      // this works because we know "parsedURI.queryKey" exists and ".category" is only one layer beneath that
      var listName = parsedURI.queryKey.category || "unset";
    
      // add the "actionField" key with one item including the "list" key and the listName var from above as value
      eecObj.ecommerce[eecAction]["actionField"] = { 'list': listName };
    
      // the above line will format our ecommerce object to look like this (adding the 'actionField' object)
      /*
      ecommerce: {
        eecAction: {
          actionField: {
            list: listName
          },
          products: products
        }
      }
      */
    
      return;
    }
}