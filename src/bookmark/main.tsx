import * as React from "react";
import * as ReactDOM from "react-dom";

import { Book, nodeToBook } from "./model/Book";

import { CashbackDetailComponent } from "./component/CashbackDetailComponent";
import { Filter, FilterComponnet } from "./component/FilterComponent";
import { loadData } from "../utils";
import { CashbackDetail, fetchCashbackDetail } from "./model/CashbackDetail";

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
const initializeCacheDetail = (books: Book[]) => {
    const CACHE_EXPIRE_MILLIS = 60 * 60 * 24 * 7 * 1000; // 1 week
    const loadCachebackDetail = (book: Book): Promise<CashbackDetail> =>
        loadData(`bookmark-${book.id}`, CACHE_EXPIRE_MILLIS, () =>
            fetchCashbackDetail(book.apiUrl)
        );
    books
        .filter((b) => b.isCashback)
        .forEach(async (b) => {
            const app = document.createElement("div");
            b.ref.firstElementChild?.appendChild(app);
            const detail = await loadCachebackDetail(b);
            ReactDOM.render(
                <CashbackDetailComponent book={b} detail={detail} />,
                app
            );
        });
};

// main
const allItems = Array.from(document.querySelectorAll("ul#list > li")).map(
    nodeToBook
);
initializeFilter(allItems);
initializeCacheDetail(allItems);
