import * as React from "react";

export type Filter = {
    title: string;
    discount: boolean;
    cachback: boolean;
};

export const FilterComponnet = (props: {
    onUpdate: (filter: Filter) => void;
}) => {
    const [filterTitle, setFilterTitle] = React.useState("");
    const [filterDiscount, setFilterDiscount] = React.useState(false);
    const [filterCachback, setFilterCachback] = React.useState(false);
    React.useEffect(() => {
        props.onUpdate({
            title: filterTitle,
            discount: filterDiscount,
            cachback: filterCachback,
        });
    }, [filterTitle, filterDiscount, filterCachback]);
    return (
        <div
            className="d-boxcaptside d-boxpagenation"
            style={{ fontSize: "12px" }}
        >
            抽出
            <input
                type="text"
                value={filterTitle}
                placeholder="タイトル"
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
};
