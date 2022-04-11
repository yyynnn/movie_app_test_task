import React from "react";
import { Link } from "react-router-dom";
import { People, Reports, Rows, Settings, Works, World, listicon } from "../../img/Icons/indexIcon";

const MenuPanel = () => {
    return (
        <div className="colorBg">
            <div className=" text-center">
                <div className="col-lg-12 mx-auto mt-3">
                    <Link to="/" className="p-3" title="Personal Tasks">
                        <img
                            className=" mx-auto mb-2 mt-2"
                            src={listicon}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>

                    <Link to="/" className="p-3" title="Settings">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Settings}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/database" className="p-3" title="Database">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Rows}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-3" title="Workstations">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Works}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-3" title="Personal statistics">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={People}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-3" title="Statistics">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={Reports}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-3" title="Global">
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
