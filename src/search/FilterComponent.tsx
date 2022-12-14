import * as React from "react";

type Props = {
    children: string;
    defaultValue: boolean;
    onUpdate: (checked: boolean) => void;
};

export const FilterComponent = (props: Props) => {
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
