import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/Logo.svg";
import "../css/AppHeader.css";

const AppHeader = () => {
    return (
        <>
            <div className="">
                <div className="username">
                    <p className="mb-0">George Danilyants</p>
                    <p className="mb-0">Peikko Russia</p>
                </div>
                <div className="text-center" to="/">
                    <Link to="/">
                        <img
                            className="d-block mx-auto mb-3 mt-2"
                            src={logo}
                            alt="logo"
                            width="200"
                            height="50"
                        />
                    </Link>

                    <p className="appheader">Build the statistics. Improve yourself.</p>
                </div>
            </div>
        </>
    );
};

export default AppHeader;
