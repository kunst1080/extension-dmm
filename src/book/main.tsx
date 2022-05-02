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

const app = document.querySelector("#main-bmk > div > div.d-sect");
ReactDOM.render(<Main books={initData} />, app);
