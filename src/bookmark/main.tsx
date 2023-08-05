import * as React from "react";
import * as ReactDOM from "react-dom";

import { Book, nodeToBook } from "./model/Book";

import { CashbackDetailComponent } from "./component/CashbackDetailComponent";
import { Filter, FilterComponnet } from "./component/FilterComponent";

// Filter
const initializeFilter = (books: Book[]) => {
    const handleFilter = (filter: Filter) => {
        books.forEach((b) => {
            const isShow =
                b.title.includes(filter.title) &&
                (!filter.discount || b.txtOff != null) &&
                (!filter.cachback || b.isCashback) &&
                (!filter.cachback2 || (b.isCashback && b.rate && b.rate >= 50));
            b.ref.hidden = !isShow;
        });
    };
    const filterApp = document.createElement("div");
    filterApp.className = "d-lcol";
    document
        .querySelector("#main-bmk > div.d-area > div > div:last-of-type")
        ?.prepend(filterApp);
    ReactDOM.render(<FilterComponnet onUpdate={handleFilter} />, filterApp);
};

// CashbackDetail
const initializeCacheDetila = (books: Book[]) => {
    books
        .filter((b) => b.isCashback)
        .forEach((b) => {
            const app = document.createElement("div");
            b.ref.firstElementChild?.appendChild(app);
            ReactDOM.render(<CashbackDetailComponent book={b} />, app);
        });
};

// main
const allItems = Array.from(document.querySelectorAll("ul#list > li")).map(
    nodeToBook
);
initializeFilter(allItems);
initializeCacheDetila(allItems);
