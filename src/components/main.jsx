import React from "react";
import logo from "../img/Logo.svg";
import env from "../img/GroupEnvironment.svg";
import hes from "../img/GroupHealthSafety.svg";
import qual from "../img/GroupQuality.svg";

const Main = () => {
    return (
        <div className="colorBg">
            <div className="px-4 py-5 text-center">
                <img
                    className="d-block mx-auto mb-2 mt-2"
                    src={logo}
                    alt="logo"
                    width="200"
                    height="50"
                />
                <p className="display-6 colorText">Build the statistics. Improve yourself.</p>
                <div className="col-lg-6 mx-auto">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <img
                            className="d-block mx-auto mb-2 mt-2"
                            src={qual}
                            alt="1"
                            width="280"
                            height="380"
                        />
                        <img
                            className="d-block mx-auto mb-2 mt-2"
                            src={hes}
                            alt="2"
                            width="280"
                            height="380"
                        />
                        <img
                            className="d-block mx-auto mb-2 mt-2"
                            src={env}
                            alt="3"
                            width="280"
                            height="380"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
