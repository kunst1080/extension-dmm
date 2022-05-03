import { FetchMesage, FetchHTMLResponse, Message } from "./Message";

chrome.runtime.onMessage.addListener(
  (
    message: Message | FetchMesage,
    sender: any,
    callback: (response: FetchHTMLResponse) => void
  ) => {
    if (message.type == "fetch") {
      doFetch(message, callback);
    }
    return true;
  }
);

const doFetch = (
  message: FetchMesage,
  callback: (response: FetchHTMLResponse) => void
): void => {
  console.debug("fetch:" + message.url);
  fetch(message.url)
    .then((res) => res.text())
    .then((html) => {
      callback({
        html: html,
      });
    });
};
