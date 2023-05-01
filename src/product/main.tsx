import * as React from "react";
import * as ReactDOM from "react-dom";
import { loadData } from "../utils";

import { MainComponent } from "./component/MainComponent";

import { SeriesJson } from "./model/SeriesJson";

const CACHE_EXPIRE_MILLIS = 60 * 60 * 24 * 1 * 1000; // 1 day

const shopName = location.hostname == "book.dmm.com" ? "general" : "adult";

const fetchData = async (seriesId: string) => {
    const r = await fetch(
        `/ajax/bff/contents/?shop_name=${shopName}&series_id=${seriesId}&page=1&per_page=100&last_read_position=0&order=asc`
    );
    const s = await r.json();
    console.debug(s);
    return s;
};

const main = (root: HTMLElement) => {
    const app = document.createElement("div");
    app.className = "books-empty";
    app.append("Loading...");
    root.parentElement?.prepend(app);
    root.remove();

    const seriesId = location.pathname.split("/")[2];
    loadData(`product-${seriesId}`, CACHE_EXPIRE_MILLIS, () =>
        fetchData(seriesId)
    ).then((json: SeriesJson) => {
        app.className = "";
        console.log(json);
        ReactDOM.render(
            <MainComponent
                shopName={shopName}
                seriesId={seriesId}
                json={json}
            />,
            app
        );
    });
};

if (location.pathname.split("/")[3] !== "volumes") {
    const appObserver = new MutationObserver((mutationsList, observer) => {
        mutationsList
            .filter((m) => m.target.nodeName == "MAIN")
            .filter((m) => m.addedNodes.length > 0)
            .flatMap((m) => {
                const arr: Array<HTMLElement> = [];
                m.addedNodes
                    .item(0)
                    ?.childNodes.forEach((n) => arr.push(n as HTMLElement));
                return arr;
            })
            .filter(
                (n) =>
                    n.nodeName == "UL" &&
                    n.classList.length == 0 &&
                    !n.nextSibling?.textContent?.includes("期間限定")
            )
            .forEach(main);
    });
    appObserver.observe(document.getElementById("root") as Node, {
        attributes: false,
        childList: true,
        subtree: true,
    });
}
