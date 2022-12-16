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

export const loadData = async <T>(
  key: string,
  expireMillis: number,
  loadFunction: Promise<T>
): Promise<T> => {
  const c = await chrome.storage.local.get(key).then((c) => c[key]);
  if (c && c.expire > Date.now()) {
    console.debug(`use cache: ${key}`);
    return c.data as T;
  }
  console.debug(`fetch data: ${key}`);
  const cd = await loadFunction;
  chrome.storage.local.set({
    [key]: {
      data: cd,
      expire: Date.now() + expireMillis,
    },
  });
  return cd;
};
