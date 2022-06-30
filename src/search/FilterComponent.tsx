import * as React from "react";

export type Filter = {
    tanwa: boolean;
    gentei: boolean;
};

export const FilterComponnet = (props: {
    onUpdate: (filter: Filter) => void;
}) => {
    const [filterTanwa, setFilterTanwa] = React.useState(true);
    const [filterGentei, setFilterGentei] = React.useState(true);
    React.useEffect(() => {
        props.onUpdate({
            tanwa: filterTanwa,
            gentei: filterGentei,
        });
    }, [filterTanwa, filterGentei]);
    return (
        <div style={{ fontSize: "12px" }}>
            <label htmlFor="tanwa" style={{ marginLeft: "10px" }}>
                <input
                    id="tanwa"
                    type="checkbox"
                    checked={filterTanwa}
                    onChange={(e) => setFilterTanwa(e.target.checked)}
                />
                単話を非表示
            </label>
            <label htmlFor="gentei" style={{ marginLeft: "10px" }}>
                <input
                    id="gentei"
                    type="checkbox"
                    checked={filterGentei}
                    onChange={(e) => setFilterGentei(e.target.checked)}
                />
                限定を非表示
            </label>
        </div>
    );
};
