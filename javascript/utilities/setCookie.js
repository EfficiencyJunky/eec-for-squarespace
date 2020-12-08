/**
 * A Utility function that abstracts the creation or updating of a 1st party browser cookie
 * This function was written by Simo Ahava: https://www.simoahava.com/analytics/two-ways-to-persist-data-via-google-tag-manager/
 * 
 * @param {String} name Required. The cookie name.
 * @param {String} value Required. Value for the cookie.
 * @param {Number} ms Expiration time of the cookie in milliseconds. If not set, defaults to Session.
 * @param {String} path Path of the cookie. If not set, defaults to the current path.
 * @param {String} domain Domain of the cookie. If not set, defaults to the current domain.
 * @returns nothing
 */

function() {
    return function(name, value, ms, path, domain) {
      if (!name || !value) {
        return;
      }
      var d;
      var cpath = path ? '; path=' + path : '';
      var cdomain = domain ? '; domain=' + domain : '';
      var expires = '';
      if (ms) {
        d = new Date();
        d.setTime(d.getTime() + ms);
        expires = '; expires=' + d.toUTCString();
      }
      document.cookie = name + "=" + value + expires + cpath + cdomain;
    }
  }