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