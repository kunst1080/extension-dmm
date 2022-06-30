import * as React from "react";
import * as ReactDOM from "react-dom";

import { Filter, FilterComponnet } from "./FilterComponent";

const allItems = document.querySelectorAll("#fn-list > li");

// Filter
const handleFilter = (filter: Filter) => {
    allItems.forEach((b) => {
        const li = b as HTMLElement;
        const title =
            li
                .querySelector(".m-boxListBookProductTmb img")
                ?.getAttribute("alt") || "";
        const isHidden =
            (filter.tanwa && title.includes("単話")) ||
            (filter.gentei && title.includes("限定"));
        li.hidden = isHidden;
    });
};

const app = document.createElement("li");
app.className = "m-boxListPulldownMenu__item";
document.querySelector("ul.m-boxListPulldownMenu")?.appendChild(app);
ReactDOM.render(<FilterComponnet onUpdate={handleFilter} />, app);
