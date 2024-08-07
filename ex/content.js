window.onload = () => {
  const targetDom = document.querySelector("article section aside");
  const targetParent = targetDom.parentElement;
  const insertAsideDom = document.createElement("aside");

  // 4択問題を
  insertAsideDom.innerHTML = `<div id="quizBox"></div>`;
  targetParent.insertBefore(insertAsideDom, targetDom);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("./injected.js");
  document.body.appendChild(script);
};
