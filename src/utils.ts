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
  id: string,
  expireMillis: number,
  loadFunction: Promise<T>
): Promise<T> => {
  const c = await chrome.storage.local.get(id).then((c) => c[id]);
  if (c && c.expire > Date.now()) {
    console.debug(`use cache: ${id}`);
    return c.data as T;
  }
  console.debug(`fetch data: ${id}`);
  const cd = await loadFunction;
  chrome.storage.local.set({
    [id]: {
      data: cd,
      expire: Date.now() + expireMillis,
    },
  });
  return cd;
};
