import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

const render = () => {
  const targetDom = document.querySelector(
    "article section aside[class^='View_authorInfo']"
  );
  const targetParent = targetDom?.parentElement;
  if (!targetParent) {
    return;
  }
  const insertAsideDom = document.createElement("aside");

  insertAsideDom.innerHTML = `<div id="quizBox"></div>`;
  targetParent.insertBefore(insertAsideDom, targetDom);

  ReactDOM.createRoot(document.getElementById("quizBox")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

(() => {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = (...args) => {
    originalPushState.apply(history, args);
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
  };

  history.replaceState = (...args) => {
    originalReplaceState.apply(history, args);
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
  };

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("locationchange"));
  });

  window.addEventListener("locationchange", () => {
    setTimeout(() => {
      render();
    }, 1000);
  });
  setTimeout(() => {
    render();
  }, 1000);
})();
