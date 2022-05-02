import * as React from "react";
import { Book } from "../Book";

type UseFilter = [Book[], () => JSX.Element];

export const useFilter = (books: Book[]): UseFilter => {
    const [filteredBooks, setBooks] = React.useState<Book[]>(books);
    const [filterTitle, setFilterTitle] = React.useState("");
    const [filterDiscount, setFilterDiscount] = React.useState(false);
    const [filterCachback, setFilterCachback] = React.useState(false);
    React.useEffect(() => {
        console.log("run filter");
        console.log(filterTitle);
        setBooks(
            books
                .filter((b) => b.title.includes(filterTitle))
                .filter((b) => !filterDiscount || b.txtOff != null)
                .filter((b) => !filterCachback || b.isCashback)
        );
    }, [filterTitle, filterDiscount, filterCachback]);
    const render = () => (
        <div
            className="d-boxcaptside d-boxpagenation"
            style={{ fontSize: "12px" }}
        >
            抽出
            <input
                type="text"
                value={filterTitle}
                placeholder="タイトル抽出"
                onChange={(e) => setFilterTitle(e.target.value)}
            />
            <label htmlFor="discount" style={{ marginLeft: "10px" }}>
                <input
                    id="discount"
                    type="checkbox"
                    checked={filterDiscount}
                    onChange={(e) => setFilterDiscount(e.target.checked)}
                />
                割引
            </label>
            <label htmlFor="cashback" style={{ marginLeft: "10px" }}>
                <input
                    id="cashback"
                    type="checkbox"
                    checked={filterCachback}
                    onChange={(e) => setFilterCachback(e.target.checked)}
                />
                ポイント還元
            </label>
        </div>
    );
    return [filteredBooks, render];
};
