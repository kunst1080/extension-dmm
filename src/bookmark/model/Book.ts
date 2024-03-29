import { CashbackDetail } from "./CashbackDetail";

export type Book = {
  ref: HTMLElement;
  id: string;
  url: string;
  imageUrl: string;
  apiUrl: string;
  title: string;
  shortTitle: string;
  isCashback: boolean;
  isMonopoly: boolean;
  isPresale: boolean;
  canBrowser: boolean;
  canDownload: boolean;
  price: number;
  isDiscount: boolean;
  detail?: CashbackDetail;
  isSuperCashback?: boolean;
};

export const nodeToBook = (e: Element): Book => {
  const href = (e.querySelector("div.tmb > a") as HTMLAnchorElement).href;
  const url = new URL(href).searchParams.get("url") || href;
  const imgEl = e.querySelector("img.m-bookImage__img") as HTMLImageElement;
  const imageUrl = imgEl.src;
  const id = imageUrl.split("/")[5];
  const shopName =
    new URL(url).hostname == "book.dmm.com" ? "general" : "adult";
  const apiUrl = `${
    new URL(url).origin
  }/ajax/bff/content/?shop_name=${shopName}&content_id=${id}`;
  const txtOff = e.querySelector<HTMLElement>(
    ".bookmarkItem__campaign"
  )?.innerText;
  const isDiscount = txtOff && txtOff.includes("OFF") ? true : false;
  return {
    ref: e as HTMLElement,
    id: id,
    url: url,
    imageUrl: imageUrl,
    apiUrl: apiUrl,
    title: imgEl.alt,
    shortTitle: (e.getElementsByClassName("txt")[0] as HTMLElement).innerText,
    isCashback: e.getElementsByClassName("ico-st-cashback").length > 0,
    isMonopoly: e.getElementsByClassName("ico-st-monopoly").length > 0,
    isPresale: e.getElementsByClassName("ico-st-presale").length > 0,
    canBrowser: e.getElementsByClassName("ico-dg-st").length > 0,
    canDownload: e.getElementsByClassName("ico-dg-dl").length > 0,
    price: parseInt(
      (
        e.querySelector("p.price > span.price__val") as HTMLElement
      ).innerText.replace(",", "")
    ),
    isDiscount: isDiscount,
  };
};
