import * as React from "react";

import { SeriesJson } from "../model/SeriesJson";
import { BookComponnet } from "./BookComponent";

type Props = {
    seriesId: string;
    json: SeriesJson;
};

export const ListComponent = (props: Props) => {
    return (
        <React.Fragment>
            {props.json.volume_books.map((book) => (
                <BookComponnet seriesId={props.seriesId} book={book} />
            ))}
        </React.Fragment>
    );
};
