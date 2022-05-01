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
document.getElementById("main-bmk")?.prepend(app);
ReactDOM.render(<Main />, app);
