import * as React from "react";
import { Book } from "../model/Book";

type Props = {
    seriesId: string;
    book: Book;
};

const badgePurchased = (
    <div className="css-sdg8h0">
        <span
            className="css-nwqgiq"
            data-color="black"
            data-size="medium"
            data-shape="round"
            data-outlined="outlined"
        >
            購入済み
        </span>
    </div>
);

const badgeNew = (
    <div className="css-sdg8h0">
        <span
            className="css-nwqgiq"
            data-color="black"
            data-size="small"
            data-shape="round"
        >
            新刊
        </span>
    </div>
);

const AddToBasketComponent = (props: { contentId: string }) => {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
        const data = {
            cid: props.contentId,
            floor: "",
        };
        if (clicked) {
            location.href = "/basket/";
        } else {
            fetch("/ajax/basket/add/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-requested-with": "XMLHttpRequest",
                },
                body: JSON.stringify(data),
            }).then((r) => setClicked(r.ok));
        }
    };
    return (
        <div className="css-133zdp5">
            <button
                onClick={handleClick}
                data-size="small"
                data-checked="false"
                data-disabled="false"
                className="css-k7fmbg"
            >
                <div data-size="small" className="css-c4ryva">
                    {clicked ? (
                        <i
                            data-name="checkBasket"
                            data-size="medium"
                            className="css-vgxhf6"
                        ></i>
                    ) : (
                        <i
                            data-name="add"
                            data-size="small"
                            className="css-qu5ob0"
                        ></i>
                    )}
                </div>
                <span
                    data-size="small"
                    data-text-size="medium"
                    className="css-tzawzu"
                >
                    バスケット
                </span>
            </button>
        </div>
    );
};

const BuyComponent = (props: { contentId: string }) => {
    const handleClick = () => {
        const data = {
            product_ids: [props.contentId],
            back_url: location.href,
        };
        fetch("/ajax/purchase/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-requested-with": "XMLHttpRequest",
            },
            body: JSON.stringify(data),
        })
            .then((r) => r.json())
            .then((r) => {
                location.href = r.cashier_url;
            });
    };
    return (
        <div className="css-133zdp5">
            <button
                onClick={handleClick}
                data-size="small"
                data-theme="orange"
                data-disabled="false"
                className="css-1jqjoin"
            >
                <span
                    data-size="small"
                    data-theme="orange"
                    className="css-19lo0zs"
                >
                    購入する
                </span>
            </button>
        </div>
    );
};

export const BookComponnet = (props: Props) => {
    const book = props.book;
    const point = book.sell.campaign_detail.campaign.point;
    return (
        <div
            data-is-read={book.is_read}
            data-variant="default"
            className="css-1ei0ipw"
        >
            <div className="css-17xt38w">
                <a
                    href={`/product/${props.seriesId}/${book.content_id}/`}
                    className="css-80zplh"
                >
                    <img src={book.image_urls.ps} className="css-mbbxno" />
                </a>
                <div className="css-1quawe3">
                    <div className="css-zs5j5i">
                        <div className="css-vnrcqa">
                            {book.purchased && badgePurchased}
                            {book.status.is_new_work && badgeNew}
                        </div>
                        <a
                            data-is-read={book.is_read}
                            data-is-limited="false"
                            href={`/product/${props.seriesId}/${book.content_id}/`}
                            className="css-1bqwxmy"
                            target="_blank"
                        >
                            <div className="book-title">{book.title}</div>
                        </a>
                    </div>
                    {point && (
                        <div data-color="red" className="book-pint">
                            {`pt還元: ${point.rate}%
                            (${new Date(point.end).toLocaleString()}まで)`}
                        </div>
                    )}
                    <div>
                        <span className="book-price">
                            {book.sell.fixed_price}円
                        </span>
                    </div>
                </div>
                {book.purchased ? (
                    <div className="css-j5weua">
                        <a
                            href={book.purchased.streaming_url}
                            data-theme="blue"
                            data-size="small"
                            className="css-yrc6gc"
                            target="_blank"
                        >
                            <span
                                data-theme="blue"
                                data-font-size="small"
                                className="css-13vg220"
                            >
                                ブラウザで読む
                            </span>
                        </a>
                        <a
                            href={book.purchased.download_url}
                            className="css-e6gzbg"
                        >
                            作品をダウンロードする
                        </a>
                    </div>
                ) : (
                    <div className="css-j5weua">
                        <a
                            href={book.tachiyomi_url}
                            data-theme="normal"
                            data-size="small"
                            rel="nofollow"
                            className="css-yrc6gc"
                        >
                            <span
                                data-theme="normal"
                                data-font-size="small"
                                className="css-13vg220"
                            >
                                試し読み
                            </span>
                        </a>
                        <BuyComponent contentId={book.content_id} />
                        <AddToBasketComponent contentId={book.content_id} />
                    </div>
                )}
            </div>
        </div>
    );
};
