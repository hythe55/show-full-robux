chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getRobloxCookie") {
      // Fetch the Roblox Security Cookie
      chrome.cookies.get({ url: "https://www.roblox.com", name: ".ROBLOSECURITY" }, function (cookie) {
        if (cookie) {
          sendResponse({ cookie: cookie.value });  // Send the cookie back to the content script
        } else {
          sendResponse({ error: "Cookie not found" });
        }
      });
      return true;  // Keep the messaging channel open for async response
    }
  });
  