import React from "react";
import {Link} from "react-router-dom";
import {logo} from "../img/indexImage";
import "../css/AppHeader.css";

const AppHeader = () => {
    return (
        <>
            <div className="header">
                <div className="username">
                    <p className="mb-0">George Danilyants</p>
                    <p className="mb-0">Peikko Russia</p>
                </div>
                <div className="logo" to="/">
                    <Link to="/">
                        <img
                            className="d-block mx-auto mb-3 mt-2"
                            src={logo}
                            alt="logo"
                            width="266"
                            height="79"
                        />
                    </Link>

                    <p className="appheader">Build the statistics. Improve yourself.</p>
                </div>
            </div>
        </>
    );
};

export default AppHeader;
