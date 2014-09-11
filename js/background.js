
function checkForValidUrl(tabId, changeInfo, tab) {
if (tab.url.indexOf('https://code.google.com/p/chromium/codesearch') > -1) {
  // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
