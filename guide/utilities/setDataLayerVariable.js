/**
 * A Utility function that abstracts the modification of a dataLayer variable
 * This is definitely not the ideal way to set a DL variable, but sometimes it is necessary
 * 
 * @param {String} name Required. The dataLayer Variable name.
 * @param {Any} value Required. Value to set the dataLayer Variable.
 * @returns nothing
 */

function() {
    return function(name, value) {

        var gtmDataLayerRef = window.google_tag_manager[{{Container ID}}].dataLayer;

        if(!gtmDataLayerRef.get(name) ){
            return;
        }

        gtmDataLayerRef.set(name, value);
    
    }
}