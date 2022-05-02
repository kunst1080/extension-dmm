import axios, { AxiosResponse } from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Book, convertFromNode } from "./Book";

import { useFilter } from "./component/Filter";
import { Item } from "./component/Item";

const Main = (props: { books: Book[] }) => {
    const [filteredBooks, renderFilter] = useFilter(props.books);
    return (
        <div>
            {renderFilter()}
            <div className="d-item">
                <ul id="list">
                    {filteredBooks.map((book) => {
                        return (
                            <li style={{ width: "178px" }}>
                                <Item {...book} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

const initData = Array.from(
    document.querySelectorAll("ul#list > li > div")
).map(convertFromNode);
console.log(initData);

// // next pages
// const hrefs = new Set(
//     Array.from(
//         document.querySelectorAll(
//             "#main-bmk > div > div:first-child > div:first-of-type > ul > li > a"
//         )
//     ).map((e) => {
//         e.getAttribute("href");
//     })
// );
// Array.from(hrefs)
//     .map((href) => [])
//     .reduce((a, b) => a.concat(b), initData);
// console.log(hrefs);

// for debug
// const app = document.createElement("div");
// document.querySelector("#main-bmk > div")?.prepend(app);

// axios({
//     method: "GET",
//     url: "/api/response/as/html",
//     params: { hoge: "fuga" },
//     responseType: "document",
// }).then((res: AxiosResponse<Document>) => {
//     // res.data.querySelectorAll;
//     // const body = document.querySelector("body");
//     // Array.from(res.data.body.childNodes).forEach((node) => {
//     //     body.appendChild(node);
//     // });
// });
const app = document.querySelector("#main-bmk > div > div.d-sect");
ReactDOM.render(<Main books={initData} />, app);
