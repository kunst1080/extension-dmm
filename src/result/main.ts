chrome.storage.local.get(null, function (items) {
  var allKeys = Object.keys(items);
  chrome.storage.local.remove(allKeys.filter((k) => k.startsWith("product-")));
});
