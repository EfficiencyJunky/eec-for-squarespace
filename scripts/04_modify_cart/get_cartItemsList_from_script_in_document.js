function(){
    return function(documentObj){

        // grab all the scripts that have been loaded on the page thus far
        var ssCartAllScripts = documentObj.querySelectorAll('script');

        // look for the one that has the checkout information we need
        for (var scriptIndex = 0; scriptIndex < ssCartAllScripts.length; scriptIndex++) {
                
            // the .match method returns 'null' if it doesn't find a match
            if(ssCartAllScripts[scriptIndex].innerHTML.match(/"cart":/)){

                var ssCartJSON = JSON.parse(ssCartAllScripts[scriptIndex].innerHTML);
                var ssCartItemsList = ssCartJSON.cart.items;
                
                for(var i=0; i < ssCartItemsList.length; i++){
                    ssCartItemsList[i].image = "";
                    ssCartItemsList[i].productDescription = "";
                }

                return ssCartItemsList;
            }
        }

        return undefined;
    }
}