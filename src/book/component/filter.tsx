import * as React from "react";
import * as ReactDOM from "react-dom";

const Main = () => {
    return (
        <div
            style={{
                backgroundColor: "blue",
                color: "white",
                textAlign: "center",
            }}
        >
            This is React
        </div>
    );
};

const app = document.createElement("div");
app.className = "d-lcol";
document.querySelector("#main-bmk > div > div > div:last-child")?.append(app);
ReactDOM.render(<Main />, app);
