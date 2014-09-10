
if (window == top) {

  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {

  });

  var StorageArea = chrome.storage.sync;

  var load = function( readyCallback ) {
    StorageArea.get( null, function(items) {
      readyCallback(items);
    });
  }; // load

  var store = function(items) {
    StorageArea.set( items, function() {});
  }; // store

  window.onload = function() {

    load(function(settings) {

      var themes = [
        "",
        "codesearch-theme default",
        "codesearch-theme monokai",
        "codesearch-theme twilight",
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
      var themeIndex = ('themeIndex' in settings) ? settings['themeIndex'] : 3;
      setTheme( themeIndex );

    }); // load

   }; // window.load

} // if
