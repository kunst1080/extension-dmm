import * as React from "react";
import * as ReactDOM from "react-dom";

import { Book, nodeToBook } from "./model/Book";
import { Filter, FilterComponnet } from "./component/FilterComponent";

const root = document.querySelector<HTMLElement>("div.m-favoriteLink");
if (!root) {
    throw new Error("root not found");
}
root.innerHTML = "";
root.classList.add("d-boxcaptside");
root.classList.add("d-boxpagenation");

// Filter
const initializeFilter = (books: Book[]) => {
    const handleFilter = (filter: Filter) => {
        books.forEach((b) => {
            const isShow =
                b.title.includes(filter.title) &&
                (!filter.discount || b.isDiscount) &&
                (!filter.cachback || b.isCashback) &&
                (!filter.cachback2 || b.isSuperCashback);
            b.ref.hidden = !isShow;
        });
    };
    const filterApp = document.createElement("div");
    filterApp.className = "d-lcol";
    root.appendChild(filterApp);
    ReactDOM.render(<FilterComponnet onUpdate={handleFilter} />, filterApp);
};

// main
const allItems = Array.from(document.querySelectorAll("ul#list > li")).map(
    nodeToBook
);
initializeFilter(allItems);
