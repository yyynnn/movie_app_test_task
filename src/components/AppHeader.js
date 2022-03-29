import React from "react";
import logo from "../img/Logo.svg";

const AppHeader = () => {
    return (
        <div className="px-2 py-1 text-center">
            <img
                className="d-block mx-auto mb-3 mt-2"
                src={logo}
                alt="logo"
                width="200"
                height="50"
            />
            <p
                className="display-6
			 colorText weightText"
            >
                Build the statistics. Improve yourself.
            </p>
        </div>
    );
};

export default AppHeader;
