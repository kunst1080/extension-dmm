import * as React from "react";
import * as ReactDOM from "react-dom";
import { nodeToBook } from "./Book";

import { Filter, FilterComponnet } from "./component/FilterComponent";

const allItems = Array.from(document.querySelectorAll("ul#list > li"));

// Filter
const handleFilter = (filter: Filter) => {
    allItems.map(nodeToBook).forEach((b) => {
        const isShow =
            b.title.includes(filter.title) &&
            (!filter.discount || b.txtOff != null) &&
            (!filter.cachback || b.isCashback);
        b.ref.hidden = !isShow;
    });
};
const filterApp = document.createElement("div");
filterApp.className = "d-lcol";
document
    .querySelector("#main-bmk > div.d-area > div > div:last-of-type")
    ?.prepend(filterApp);
ReactDOM.render(<FilterComponnet onUpdate={handleFilter} />, filterApp);
