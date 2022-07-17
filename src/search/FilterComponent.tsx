import * as React from "react";

export const FilterComponnet = (props: {
    children: string;
    defaultValue: boolean;
    onUpdate: (checked: boolean) => void;
}) => {
    const id = React.useId();
    const [checked, setChecked] = React.useState(props.defaultValue);
    React.useEffect(() => {
        props.onUpdate(checked);
    });
    return (
        <label htmlFor={id} style={{ marginLeft: "10px" }}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
            {props.children}
        </label>
    );
};
