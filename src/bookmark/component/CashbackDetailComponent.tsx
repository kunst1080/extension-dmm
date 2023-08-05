import * as React from "react";
import { CSSProperties } from "react";

import { Book } from "../model/Book";
import { CashbackDetail } from "../model/CashbackDetail";

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
    detail: CashbackDetail;
}) => {
    if (props.detail == null) return <div>Loading...</div>;
    return (
        <div>
            <div style={props.detail.rate >= 50 ? superStyle : normalStyle}>
                {props.detail.rate} %還元
            </div>
            <div style={{ fontSize: "12px" }}>
                {props.detail.point} ポイント付与
            </div>
        </div>
    );
};
