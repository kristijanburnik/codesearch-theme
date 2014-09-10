
if (window == top) {

  var StorageArea = chrome.storage.sync;

  var load = function( readyCallback ) {
    StorageArea.get( null, function(items) {
      readyCallback(items);
    });
  }; // load

  var store = function(items) {
    StorageArea.set( items, function() {});
  }; // store


  // default settings
  var settings = {
    themeIndex: 0
  };

  var ready = function() {

      var themes = [
        "codesearch-theme default",
        "codesearch-theme monokai",
        "codesearch-theme twilight",
        "" // original native theme
      ];

      var body = document.getElementsByTagName("body")[0];
      var prefixBodyClass = body.className;

      var setTheme = function(index) {
        var theme = prefixBodyClass + " " + themes[index];
        body.className = theme;

        settings['themeIndex'] = index;
        store(settings);
      }

      var nextTheme = function() {
        themeIndex = (themeIndex+1) % themes.length;
        setTheme(themeIndex);
      }

      document.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode == 76)
          nextTheme();
      }); // document.addEventListener


      // init
      var themeIndex = settings['themeIndex'];
      setTheme( themeIndex );

   }; // ready

  // both events need to finish
  var readyCounter = 2;
  var partialReady = function(){
    if (--readyCounter > 0) return;
    ready();
  };

  // failsafe
  setTimeout(function(){
    if (readyCounter > 0) ready();
  },500);

  load(function(s) {
    if (typeof s == typeof {})
      for (var x in s)
        settings[x] = s[x];
    partialReady();
  });

  document.addEventListener('DOMContentLoaded', partialReady, false);

} // if
