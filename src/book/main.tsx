import * as React from "react";
import * as ReactDOM from "react-dom";
import { Book, convertFromNode } from "./Book";

import { Filter, FilterComponnet } from "./component/FilterComponent";
import { ItemComponent } from "./component/ItemComponent";

const Main = (props: { books: Book[] }) => {
    const [books, setBooks] = React.useState(props.books);
    const handleFilter = (filter: Filter) => {
        console.log("Filter Updated");
        setBooks(
            props.books
                .filter((b) => b.title.includes(filter.title))
                .filter((b) => !filter.discount || b.txtOff != null)
                .filter((b) => !filter.cachback || b.isCashback)
        );
    };
    return (
        <div>
            <FilterComponnet onUpdate={handleFilter} />
            <div className="d-item">
                <ul id="list">
                    {books.map((book) => {
                        console.log("loop:" + book.title);
                        return (
                            <li style={{ width: "178px" }}>
                                <ItemComponent {...book} />
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
