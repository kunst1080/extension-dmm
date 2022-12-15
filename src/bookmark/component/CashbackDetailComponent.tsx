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
    const doc = new DOMParser().parseFromString(body, "text/html");
    const price = parseInt(
        (
            doc.querySelector(
                ".m-boxSubDetailPurchase__price__value,.m-boxPurchaseChoice__price"
            ) as HTMLElement
        ).innerText.replace(",", "")
    );
    const point = parseInt(
        (
            doc.querySelector(
                ".m-boxMainDetailPurchase__areaPoint__item dd"
            ) as HTMLElement
        ).innerText
    );
    const rate = Math.trunc((100 * point) / (price / 1.1));
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

export const CashbackDetailComponent = (props: Book) => {
    const [data, setData] = React.useState<CashbackDetail | null>(null);
    React.useEffect(() => {
        loadData(props.id, CACHE_EXPIRE_MILLIS, fetchData(props.url)).then(
            (d) => setData(d)
        );
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
