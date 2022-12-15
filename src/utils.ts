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

export const loadData = <T>(
  id: string,
  expireMillis: number,
  loadFunction: Promise<T>
): Promise<T> => {
  return chrome.storage.local.get(id).then((c) => {
    if (c[id] && Date.now() - c[id].createdAt < expireMillis) {
      console.debug(`use cache: ${id}`);
      return c[id] as T;
    }
    console.debug(`fetch data: ${id}`);
    return loadFunction.then((cd) => {
      chrome.storage.local.set({
        [id]: cd,
      });
      return cd;
    });
  });
};
