export type Book = {
  ref: HTMLElement;
  id: string;
  title: string;
  price: number;
  isCashback: boolean;
  isDiscount: boolean;
  isSuperCashback: boolean;
};

function getText(e: Element, selector: string): string {
  return e.querySelector<HTMLElement>(selector)?.innerText || "";
}

export const nodeToBook = (e: Element): Book => {
  const id = e.getAttribute("data-item") || "";
  const title =
    e.querySelector<HTMLImageElement>("img.m-bookImage__img")?.alt || "";
  const isDiscount = getText(e, ".price__val--emphasis") != "";
  const txtCampaign = getText(e, ".bookmarkItem__campaign");
  const pointRate = parseInt(txtCampaign.replace("%pt還元予定", ""));
  const isSuperCashback = pointRate >= 45;
  if (isSuperCashback) {
    e.classList.add("super-cashback");
  }
  return {
    ref: e as HTMLElement,
    id: id,
    title: title,
    price: parseInt(getText(e, "p.price > span.price__val").replace(",", "")),
    isCashback: pointRate > 0,
    isSuperCashback: isSuperCashback,
    isDiscount: isDiscount,
  };
};
