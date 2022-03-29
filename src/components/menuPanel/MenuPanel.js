import React from "react";
import { Link } from "react-router-dom";
import { People, Reports, Rows, Settings, Works, World, listicon } from "../../img/Icons/indexIcon";

const MenuPanel = () => {
    return (
        <div className="colorBg">
            <div className=" text-center">
                <div className="col-lg-8 mx-auto">
                    <Link to="/list">
                        <img
                            className=" mx-auto mb-2 mt-2"
                            src={listicon}
                            alt="3"
                            width="50"
                            height="50"
                        />
                    </Link>

                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Settings}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Rows}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Works}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={People}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Reports}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={World}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuPanel;
