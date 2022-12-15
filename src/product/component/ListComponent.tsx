import * as React from "react";

import { SeriesJson } from "../model/SeriesJson";
import { BookComponnet } from "./BookComponent";

type Props = {
    seriesId: string;
    json: SeriesJson;
    hidePurchased: boolean;
};

export const ListComponent = (props: Props) => {
    const filteredBooks = props.json.volume_books.filter(
        (book) => !props.hidePurchased || !book.purchased
    );
    const hiddenCount = props.json.volume_books.length - filteredBooks.length;
    if (filteredBooks.length == 0) {
        return <div className="books-empty">すべて購入済み</div>;
    } else {
        return (
            <ul>
                {hiddenCount > 0 && <div>{hiddenCount}冊 非表示中</div>}
                {filteredBooks.map((book) => (
                    <BookComponnet seriesId={props.seriesId} book={book} />
                ))}
            </ul>
        );
    }
};
