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
    if (filteredBooks.length == 0) {
        return <div className="books-empty">すべて購入済み</div>;
    } else {
        return (
            <ul>
                {filteredBooks.map((book) => (
                    <BookComponnet seriesId={props.seriesId} book={book} />
                ))}
            </ul>
        );
    }
};
