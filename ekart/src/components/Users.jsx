import React from "react";
import Button from "../Template/Button";

function Users({name}) {
    return (
        <span className="userName">Hello {name}</span>
    )
}

export default React.memo(Users)