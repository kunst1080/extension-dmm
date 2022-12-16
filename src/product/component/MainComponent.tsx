import * as React from "react";

import { SeriesJson } from "../model/SeriesJson";

import { FilterComponent } from "./FilterComponent";
import { ListComponent } from "./ListComponent";

type Props = {
    shopName: string;
    seriesId: string;
    json: SeriesJson;
};

export const MainComponent = (props: Props) => {
    const [hidePurchased, setHidePurchased] = React.useState(false);
    const handleFilter = (checked: boolean) => {
        setHidePurchased(checked);
    };
    return (
        <React.Fragment>
            <FilterComponent defaultValue={true} onUpdate={handleFilter}>
                購入済み非表示
            </FilterComponent>
            <ListComponent
                shopName={props.shopName}
                seriesId={props.seriesId}
                json={props.json}
                hidePurchased={hidePurchased}
            />
        </React.Fragment>
    );
};
