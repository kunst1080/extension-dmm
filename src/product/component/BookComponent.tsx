import * as React from "react";
import { Book, Campaign } from "../model/Book";

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

const AddToFavoriteComponent = (props: { contentId: string }) => {
    const shopName = location.hostname == "book.dmm.com" ? "general" : "adult";

    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
        const data = {
            item_id: props.contentId,
            shop_name: shopName,
        };
        if (clicked) {
            location.href = "/bookmark/";
        } else {
            fetch("/ajax/bookmark/add/", {
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
                className={`css-k7fmbg ${clicked ? "clicked" : ""}`}
            >
                <div data-size="small" className="css-c4ryva">
                    <i
                        data-name="bookmarkDeleted"
                        data-size="medium"
                        className="css-18g3p83"
                    ></i>
                </div>
                <span
                    data-size="small"
                    data-text-size="medium"
                    className="css-tzawzu"
                >
                    お気に入り
                </span>
            </button>
        </div>
    );
};

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
                className={`css-k7fmbg ${clicked ? "clicked" : ""}`}
            >
                <div data-size="small" className="css-c4ryva">
                    <i
                        data-name="add"
                        data-size="small"
                        className="css-qu5ob0"
                    ></i>
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

const PriceComponent = (props: {
    fixedPrice: number;
    campaignPrice: number;
}) => {
    if (props.campaignPrice) {
        return (
            <div>
                <span className="book-price correction">
                    {props.fixedPrice}円
                </span>
                <span className="book-price red_">{props.campaignPrice}円</span>
            </div>
        );
    } else {
        return (
            <div>
                <span className="book-price">{props.fixedPrice}円</span>
            </div>
        );
    }
};

const CampaignComponent = (props: { campaign: Campaign }) => {
    return (
        <div>
            {props.campaign.sales && (
                <div className="book-campaign red_">
                    {props.campaign.sales.rate}% OFF (
                    {new Date(props.campaign.sales.end).toLocaleString()}まで)
                </div>
            )}
            {props.campaign.point && (
                <div className="book-campaign red_">
                    {props.campaign.point.rate}% pt還元 (
                    {new Date(props.campaign.point.end).toLocaleString()}
                    まで)
                </div>
            )}
        </div>
    );
};

export const BookComponnet = (props: Props) => {
    const book = props.book;
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
                            className="book-title"
                            target="_blank"
                        >
                            <div>{book.title}</div>
                        </a>
                    </div>
                    <CampaignComponent
                        campaign={book.sell.campaign_detail.campaign}
                    />
                    <PriceComponent
                        fixedPrice={book.sell.fixed_price}
                        campaignPrice={book.sell.campaign_price}
                    />
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
                        <AddToFavoriteComponent contentId={book.content_id} />
                    </div>
                )}
            </div>
        </div>
    );
};
