import { xfetch } from "../../utils";

export type CashbackDetail = {
  point: number;
  rate: number;
  createdAt: number;
};

export const fetchCashbackDetail = async (
  url: string
): Promise<CashbackDetail> => {
  const body = await xfetch(url);
  const json = JSON.parse(body);
  const price = json.sell.campaign_price
    ? json.sell.campaign_price
    : json.sell.fixed_price;
  const rate = json.sell.campaign_detail.campaign.point.rate;
  const noTax = Math.trunc((price * 100) / 11 / 10);
  const point = Math.trunc((noTax * rate) / 100);
  const cd = {
    point: point,
    rate: rate,
    createdAt: Date.now(),
  };
  return cd;
};
