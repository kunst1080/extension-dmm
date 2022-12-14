import { FetchMesage, FetchResponse, Message } from "./Message";

chrome.runtime.onMessage.addListener(
  (
    message: Message | FetchMesage,
    sender: any,
    callback: (response: FetchResponse) => void
  ) => {
    if (message.type == "fetch") {
      doFetch(message, callback);
    }
    return true;
  }
);

const doFetch = (
  message: FetchMesage,
  callback: (response: FetchResponse) => void
): void => {
  console.debug("fetch:" + message.url);
  fetch(message.url)
    .then((res) => res.text())
    .then((body) => {
      callback({
        body: body,
      });
    });
};
