import * as React from "react";

import { Book } from "../Book";

const formatPrice = (price: number) =>
    new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
    }).format(price);

export const ItemComponent = (props: Book) => {
    const formattedPrice = formatPrice(props.price);
    return (
        <div>
            <label className="checkarea">
                <input
                    type="checkbox"
                    name="item_info[]"
                    value={`${props.id}.Abook`}
                    param-item-id={`${props.id}`}
                    param-price={`${props.price}`}
                    id="dmm"
                />
            </label>
            <p className="status">
                {props.isCashback && (
                    <span className="ico-st-cashback">
                        <span>還元</span>
                    </span>
                )}
                {props.isMonopoly && (
                    <span className="ico-st-monopoly">
                        <span>独占</span>
                    </span>
                )}
                {props.isPresale && (
                    <span className="ico-st-presale">
                        <span>先行</span>
                    </span>
                )}
            </p>
            <p className="tmb">
                <a href={props.url}>
                    <span className="img">
                        <img src={props.imageUrl} alt={props.title} />
                    </span>
                    <span className="txt">{props.shortTitle}</span>
                </a>
            </p>
            <p className="format">
                {props.canBrowser && (
                    <span className="ico-dg-st">
                        <span>ブラウザ視聴</span>
                    </span>
                )}
                {props.canDownload && (
                    <span className="ico-dg-dl">
                        <span>ダウンロード</span>
                    </span>
                )}
            </p>
            {props.txtOff && (
                <p className="txtoff">
                    <span>
                        <span>{props.txtOff}</span>
                    </span>
                </p>
            )}
            <p className="sublink">
                <span>
                    <a href="/"></a>
                </span>
                <span>
                    <a href="/"></a>
                </span>
            </p>
            <div className="value">
                <p className="price">
                    <span>価格</span>
                    <span>{formattedPrice}</span>円
                </p>
            </div>
        </div>
    );
};
