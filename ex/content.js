const insertModule = () => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("./injected.js");
  document.body.appendChild(script);
  const style = document.createElement("link");
  style.rel = "stylesheet";
  style.href = chrome.runtime.getURL("./injected.css");
  document.body.appendChild(style);
};

window.onload = insertModule;
