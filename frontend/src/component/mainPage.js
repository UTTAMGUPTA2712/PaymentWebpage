import React from "react";
import UserDetail from "./userDetail";
import ShowSeller from "./showSeller";
import Transaction from "./transaction";
function Mainpage() {

    return (
        <>
            <div id="body">
                <div id="UserDetail">
                    <UserDetail />
                </div>
                <div id="side">
                    <Transaction />
                    <br />
                    <div id="show">
                        <ShowSeller /></div>
                </div>
            </div>
        </>
    )
}
export default Mainpage;