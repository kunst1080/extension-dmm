import * as React from "react";

import { xfetch, loadData } from "../../utils";

import { Book } from "../Book";
import { CSSProperties } from "react";

const CACHE_EXPIRE_MILLIS = 60 * 60 * 24 * 7 * 1000; // 1 week

type CashbackDetail = {
    point: number;
    rate: number;
    createdAt: number;
};

const fetchData = async (url: string): Promise<CashbackDetail> => {
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

const normalStyle: CSSProperties = {
    fontSize: "12px",
    border: "1px solid #d90000",
    borderRadius: "4px",
    boxSizing: "border-box",
    padding: "4px 0",
    fontWeight: "bold",
    color: "#d90000",
    textAlign: "center",
    lineHeight: 1,
    margin: "4px 0",
};
const superStyle: CSSProperties = {
    ...normalStyle,
    backgroundColor: "#d90000",
    color: "#fff",
};

export const CashbackDetailComponent = (props: {
    book: Book;
    onRateLoaded: (rate: number) => void;
}) => {
    const [data, setData] = React.useState<CashbackDetail | null>(null);
    React.useEffect(() => {
        loadData(`bookmark-${props.book.id}`, CACHE_EXPIRE_MILLIS, () =>
            fetchData(props.book.apiUrl)
        ).then((d) => {
            setData(d);
            props.onRateLoaded(d.rate);
        });
    }, []);
    if (data == null) return <div>Loading...</div>;
    return (
        <div>
            <div style={data.rate >= 50 ? superStyle : normalStyle}>
                {data.rate} %還元
            </div>
            <div style={{ fontSize: "12px" }}>{data.point} ポイント付与</div>
        </div>
    );
};
