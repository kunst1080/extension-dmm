import * as React from "react";
import * as ReactDOM from "react-dom";

import { ListComponent } from "./component/ListComponent";
import { SeriesJson } from "./model/SeriesJson";

const main = (root: HTMLElement) => {
    const seriesId = location.pathname.split("/")[2];
    fetch(
        `/ajax/bff/contents/?shop_name=general&series_id=${seriesId}&page=1&per_page=100&last_read_position=0&order=asc`
    )
        .then((r) => r.json())
        .then((s) => {
            console.debug(s);
            return s;
        })
        .then((json: SeriesJson) =>
            ReactDOM.render(
                <ListComponent seriesId={seriesId} json={json} />,
                root
            )
        );
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
