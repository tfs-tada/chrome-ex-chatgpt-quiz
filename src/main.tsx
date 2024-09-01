import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App.tsx";
import "./styles/globals.css";

const render = () => {
  const isZenn = window.location.href.match(
    /zenn\.dev\/[^/]+\/articles\/[^/]+/
  );
  const isQiita = window.location.href.match(/qiita\.com\/[^/]+\/items\/[^/]+/);
  const isMdn = window.location.href.match(
    /https:\/\/developer\.mozilla\.org\/ja\/docs/
  );
  const isPsql = window.location.href.match(
    /https:\/\/www\.postgresql\.jp\/document\/16\/html/
  );
  if (!isZenn && !isQiita && !isMdn && !isPsql) {
    return;
  }
  if (isZenn) {
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
  } else if (isQiita) {
    const targetDom = document.querySelector(
      "article div button[aria-label^='いいねする']"
    )?.parentElement?.parentElement?.parentElement?.parentElement;
    const targetParent = targetDom?.parentElement;
    if (!targetParent || !targetDom) {
      return;
    }
    const insertAsideDom = document.createElement("aside");

    insertAsideDom.innerHTML = `<div id="quizBox"></div>`;
    targetParent.insertBefore(insertAsideDom, targetDom.nextElementSibling);
  } else if (isMdn) {
    const targetDom = document.querySelector("main article");
    const targetParent = targetDom?.parentElement;
    if (!targetParent) {
      return;
    }
    const insertAsideDom = document.createElement("aside");

    insertAsideDom.innerHTML = `<div id="quizBox"></div>`;
    targetParent.insertBefore(insertAsideDom, targetDom.nextElementSibling);
  } else if (isPsql) {
    const targetDom = document.querySelector("body .navfooter");
    const targetParent = targetDom?.parentElement;
    if (!targetParent) {
      return;
    }
    const insertAsideDom = document.createElement("aside");

    insertAsideDom.innerHTML = `<div id="quizBox"></div>`;
    targetParent.insertBefore(insertAsideDom, targetDom);
  }

  ReactDOM.createRoot(document.getElementById("quizBox")!).render(
    <React.StrictMode>
      <App
        platform={
          isZenn ? "Zenn" : isQiita ? "Qiita" : isMdn ? "Mdn" : "Doc_PostgreSQL"
        }
      />
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
    }, 200);
  });
  setTimeout(() => {
    render();
  }, 200);
})();
