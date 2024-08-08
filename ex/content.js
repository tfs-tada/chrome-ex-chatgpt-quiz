const insertModule = () => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("./injected.js");
  document.body.appendChild(script);
};

window.onload = insertModule;
