import * as React from "react";
import { Book } from "../Book";

type UseFilter = [Book[], () => JSX.Element];

export const useFilter = (books: Book[]): UseFilter => {
    const [filteredBooks, setBooks] = React.useState<Book[]>(books);
    const [filterTitle, setTitleFilter] = React.useState("");
    React.useEffect(() => {
        console.log("run filter");
        console.log(filterTitle);
        setBooks(books.filter((b) => b.title.includes(filterTitle)));
    }, [filterTitle]);
    const render = () => (
        <div className="d-boxcaptside d-boxpagenation">
            抽出
            <input
                type="text"
                value={filterTitle}
                placeholder="タイトル抽出"
                onChange={(e) => setTitleFilter(e.target.value)}
            />
        </div>
    );
    return [filteredBooks, render];
};
