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
                (!filter.discount || b.isDiscount) &&
                (!filter.cachback || b.isCashback) &&
                (!filter.cachback2 || b.isSuperCashback);
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
            b.detail = detail;
            b.isSuperCashback = detail.rate >= 49;
            ReactDOM.render(<CashbackDetailComponent book={b} />, app);
        });
};

// Clear Cache
const initializeClearCache = () => {
    const handleClick = () => {
        chrome.storage.local.clear();
        alert("clear cache");
    };
    const app = document.createElement("button");
    app.textContent = "キャッシュクリア";
    app.className = "clear-button";
    app.addEventListener("click", handleClick);
    document.querySelector("#main-bmk > div.d-area > div > div")?.prepend(app);
};

// main
const allItems = Array.from(document.querySelectorAll("ul#list > li")).map(
    nodeToBook
);
initializeFilter(allItems);
initializeCacheDetail(allItems);
initializeClearCache();
