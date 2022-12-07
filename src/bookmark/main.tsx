import * as React from "react";
import * as ReactDOM from "react-dom";

import { nodeToBook } from "./Book";

import { CashbackDetailComponent } from "./component/CashbackDetailComponent";
import { Filter, FilterComponnet } from "./component/FilterComponent";

const allItems = Array.from(document.querySelectorAll("ul#list > li")).map(
    nodeToBook
);

// Filter
const handleFilter = (filter: Filter) => {
    allItems.forEach((b) => {
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

// // CashbackDetail
// allItems
//     .filter((b) => b.isCashback)
//     .forEach((b) => {
//         const app = document.createElement("div");
//         b.ref.firstElementChild?.appendChild(app);
//         ReactDOM.render(<CashbackDetailComponent {...b} />, app);
//     });
