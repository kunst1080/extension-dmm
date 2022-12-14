export type Message = {
  type: "";
};

export type FetchMesage = {
  type: "fetch";
  url: string;
};

export type FetchResponse = {
  body: string;
};
