/**
 * A Utility function that scrapes the documentObj to find a script containing the text "cart:"
 * the script that contains this text is actually the Squarespace cart object that Squarespace generates and contains all of the information on the cart. 
 * the cart object contains a reference to the list of items in the cart that we can use to generate our EEC objects
 * 
 * @param {Document} documentObj the document we will search through to find our cartItemsList
 * @returns {Object} ssCartItemsList or undefined
 */


function(){
    return function(documentObj){

        // grab all the scripts that are available in the document
        var ssCartAllScripts = documentObj.querySelectorAll('script');

        // look for the one that has the checkout information we need
        for (var scriptIndex = 0; scriptIndex < ssCartAllScripts.length; scriptIndex++) {
                
            // we will identify the script we want by testing if it has "cart": in it or not
            // the .match method returns 'null' if it doesn't find a match
            if(ssCartAllScripts[scriptIndex].innerHTML.match(/"cart":/)){

                // once found, convert it to an object we can use and grab the list of items
                var ssCartJSON = JSON.parse(ssCartAllScripts[scriptIndex].innerHTML);
                var ssCartItemsList = ssCartJSON.cart.items;
                
                // loop through the list and set the .image and .productDescription to empty string
                // we do this because they contain a lot of information we don't need and make it harder to read the ssCartItemsList when debugging
                for(var i=0; i < ssCartItemsList.length; i++){
                    ssCartItemsList[i].image = "";
                    ssCartItemsList[i].productDescription = "";
                }

                // return the list of cart items
                return ssCartItemsList;
            }
        }

        // if we don't find the script, return undefined
        return undefined;
    }
}