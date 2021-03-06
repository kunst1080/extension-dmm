export type Book = {
  ref: HTMLElement;
  id: string;
  url: string;
  imageUrl: string;
  title: string;
  shortTitle: string;
  isCashback: boolean;
  isMonopoly: boolean;
  isPresale: boolean;
  canBrowser: boolean;
  canDownload: boolean;
  price: number;
  txtOff?: string;
};

export const nodeToBook = (e: Element): Book => {
  const href = (e.querySelector("p.tmb > a") as HTMLAnchorElement).href;
  const url = new URL(href).searchParams.get("url") || href;
  return {
    ref: e as HTMLElement,
    id: (e.querySelector(".img > img") as HTMLImageElement).src.split("/")[5],
    url: url,
    imageUrl: (e.querySelector(".img > img") as HTMLImageElement).src,
    title: (e.querySelector(".img > img") as HTMLImageElement).alt,
    shortTitle: (e.getElementsByClassName("txt")[0] as HTMLElement).innerText,
    isCashback: e.getElementsByClassName("ico-st-cashback").length > 0,
    isMonopoly: e.getElementsByClassName("ico-st-monopoly").length > 0,
    isPresale: e.getElementsByClassName("ico-st-presale").length > 0,
    canBrowser: e.getElementsByClassName("ico-dg-st").length > 0,
    canDownload: e.getElementsByClassName("ico-dg-dl").length > 0,
    price: parseInt(
      (
        e.querySelector("p.price > span:nth-child(2)") as HTMLElement
      ).innerText.replace(",", "")
    ),
    txtOff: (e.getElementsByClassName("txtoff").item(0) as HTMLElement | null)
      ?.innerText,
  };
};
