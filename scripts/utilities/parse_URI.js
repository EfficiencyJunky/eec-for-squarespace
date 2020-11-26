// UTILITY NAME: {{JS Utility - parseURI}}



// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

// this code is a very slightly adapted version of code being used courtesy of steven leviathan. More information can be found here: http://blog.stevenlevithan.com/archives/parseuri

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
    
    
    
    // FUNCTION - returns a uri object broken into the keys available in the options above. 
    //          - The most intersting is the key "query" which is a list of the uri query parameter key/values
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