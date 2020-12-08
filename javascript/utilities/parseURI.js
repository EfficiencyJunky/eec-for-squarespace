/**
 * A Utility function that takes a URI string with any number of query parameters and parses it into a set of key/value pairs given in the "keys" list of the "options" object. The most intersting key is "query", which itself contains an object who's key/value pairs are set to the query/value pairs from the URI
 * 
 * This code is a very slightly adapted version of steven leviathan's original function.
 * More information can be found here: http://blog.stevenlevithan.com/archives/parseuri
 * 
 * parseUri 1.2.2
 * (c) Steven Levithan <stevenlevithan.com>
 * MIT License
 * 
 * @param {String} str
 * @returns {Object} an object who's keys correspond to those listed in the options.key list
 */

function(){
  
    // OPTIONS - really the only one to mess with would be "stricMode" setting it to either true or false
    var options = {
        strictMode: true,
        key: [
              "source",
              "protocol",
              "authority",
              "userInfo",
              "user",
              "password",
              "host",
              "port",
              "relative",
              "path",
              "directory",
              "file",
              "query",
              "anchor"
        ],
        q: {
            name:   "queryKey",
            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
        },
        parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }
    };
    
    
    // ACTUAL FUNCTION TO BE RETURNED
    return function(str){
      
      var	o   = options,
          m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
          uri = {},
          i   = 14;
  
      while (i--) uri[o.key[i]] = m[i] || "";
  
      uri[o.q.name] = {};
      uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
          if ($1) uri[o.q.name][$1] = $2;
      });
  
      return uri;    
      
    }
    
  }