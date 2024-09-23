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
  pointRate: number;
  isSuperCashback: boolean;
};

function getText(e: Element, selector: string): string {
  return e.querySelector<HTMLElement>(selector)?.innerText || "";
}

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
  const isDiscount = getText(e, ".price__val--emphasis") != "";
  const txtCampaign = getText(e, ".bookmarkItem__campaign");
  const pointRate = parseInt(txtCampaign.replace("%pt還元", ""));
  const isSuperCashback = pointRate >= 45;
  if (isSuperCashback) {
    e.classList.add("super-cashback");
  }
  return {
    ref: e as HTMLElement,
    id: id,
    url: url,
    imageUrl: imageUrl,
    apiUrl: apiUrl,
    title: imgEl.alt,
    shortTitle: getText(e, "txt"),
    isCashback: e.getElementsByClassName("ico-st-cashback").length > 0,
    isMonopoly: e.getElementsByClassName("ico-st-monopoly").length > 0,
    isPresale: e.getElementsByClassName("ico-st-presale").length > 0,
    canBrowser: e.getElementsByClassName("ico-dg-st").length > 0,
    canDownload: e.getElementsByClassName("ico-dg-dl").length > 0,
    price: parseInt(getText(e, "p.price > span.price__val").replace(",", "")),
    pointRate: pointRate,
    isSuperCashback: isSuperCashback,
    isDiscount: isDiscount,
  };
};
