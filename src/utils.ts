import { FetchResponse } from "./Message";

export const xfetch = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        type: "fetch",
        url: url,
      },
      (response: FetchResponse) => {
        resolve(response.body);
      }
    );
  });
};
