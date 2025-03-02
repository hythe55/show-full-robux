function waitForElement(selector, callback) {
    const observer = new MutationObserver((mutations, obs) => {
        const element = document.getElementById(selector);
        if (element) {
            callback(element);
            obs.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

chrome.runtime.sendMessage({ action: "getRobloxCookie" }, (response) => {
    if (response && response.cookie) {
      fetch('https://economy.roblox.com/v1/user/currency', {
        method: "GET",
        headers: { 
            "Cookie": `.ROBLOSECURITY=${response.cookie}`
        },
        credentials: "include"
      })
      .then(response => response.json())
      .then(data => {
        waitForElement("nav-robux-amount", (robuxElement) => {
            robuxElement.textContent = data["robux"].toLocaleString()
        });
      })
      .catch(error => console.error('Error:', error));

    } else {
      console.error("Error: ", response.error);
    }
});