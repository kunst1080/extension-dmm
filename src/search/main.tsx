import * as React from "react";
import * as ReactDOM from "react-dom";

import { FilterComponent } from "./FilterComponent";

const allItems = document.querySelectorAll<HTMLElement>(
    "li.m-boxListBookProduct2__item"
);

// Filter
const handleFilter =
    (keywords: string[], className: string) => (checked: boolean) => {
        allItems.forEach((li) => {
            const title =
                li
                    .querySelector(".m-boxListBookProductTmbImg__box__img__tmb")
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
        <FilterComponent
            defaultValue={true}
            onUpdate={handleFilter(["単話", "マイクロ"], "filter-tanwa")}
        >
            単話をマスク
        </FilterComponent>
        <FilterComponent
            defaultValue={false}
            onUpdate={handleFilter(["限定"], "filter-gentei")}
        >
            限定をマスク
        </FilterComponent>
        <FilterComponent
            defaultValue={true}
            onUpdate={handleFilter(["vol."], "filter-magazine")}
        >
            雑誌をマスク
        </FilterComponent>
    </div>,
    app
);
