import * as React from "react";
import * as ReactDOM from "react-dom";

import { FilterComponnet } from "./FilterComponent";

const allItems = document.querySelectorAll<HTMLElement>("#fn-list > li");

// Filter
const handleFilter =
    (keywords: string[], className: string) => (checked: boolean) => {
        allItems.forEach((li) => {
            const title =
                li
                    .querySelector(".m-boxListBookProductTmb img")
                    ?.getAttribute("alt") || "";
            if (checked && keywords.some((k) => title.includes(k))) {
                li.classList.add(className);
            } else {
                li.classList.remove(className);
            }
        });
    };

const app = document.createElement("li");
app.className = "m-boxListPulldownMenu__item";
document.querySelector("ul.m-boxListPulldownMenu")?.appendChild(app);
ReactDOM.render(
    <div style={{ fontSize: "12px" }}>
        <FilterComponnet
            defaultValue={true}
            onUpdate={handleFilter(["単話", "マイクロ"], "filter-tanwa")}
        >
            単話をマスク
        </FilterComponnet>
        <FilterComponnet
            defaultValue={true}
            onUpdate={handleFilter(["限定"], "filter-gentei")}
        >
            限定をマスク
        </FilterComponnet>
    </div>,
    app
);
