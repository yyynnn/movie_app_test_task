import React from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import "../../css/button.css";
import "../../css/modalAll.css";
import "./Health.css";
import {health} from "../../img/indexImage";
import PossibleAccident from "./PossibleAccident";
import Accident from "./Accident";
import Nearmiss from "./Nearmiss";

const Health = () => {
    return (
        <div className="col-lg-12 mx-auto">
            <div className="wrap">
                <div className="title flex justify-content-center">
                    <div className="mt-1">
                        <img src={health} alt="health"/>
                    </div>
                    <h2 className="title-text colorTextLightGray text-update">
                        Occupational health and safety
                    </h2>
                </div>

                <div className="d-grid gap-4 d-sm-flex justify-content-sm-center btn-wrap">
                    {/* <Link className="link" to="/accident">
                        <button id="Accident" className="button health">
                            Accident
                        </button>
                    </Link> */}

                    <button
                        id="Accident"
                        className="button health"
                        data-bs-target="#accident"
                        data-bs-toggle="modal"
                    >
                        Accident
                    </button>
                    <div
                        className="modal fade"
                        id="accident"
                        tabIndex="-1"
                        aria-labelledby="modalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-xl ">
                            <div className="modal-content modalbgc">
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close btn-close-modal btn-close-white"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <Accident/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        id="Accident"
                        className="button health"
                        data-bs-target="#nearmiss"
                        data-bs-toggle="modal"
                    >
                        Nearmiss
                    </button>
                    <div
                        className="modal fade"
                        id="nearmiss"
                        tabIndex="-1"
                        aria-labelledby="modalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-xl ">
                            <div className="modal-content modalbgc">
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close btn-close-modal btn-close-white"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <Nearmiss/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Link className="link" to="/nearmiss">
                        <button id="Nearmiss" className="button health">
                            Nearmiss
                        </button>
                    </Link> */}

                    {/* <Link className="link" to="/possibleAccident">
						<button id="Possible_accident" className="button health" data-bs-target="#exampleModal">Possible accident</button>
					</Link> */}
                    <button
                        id="Possible_accident"
                        className="button health"
                        data-bs-target="#possibleAccident"
                        data-bs-toggle="modal"
                    >
                        Possible accident
                    </button>
                    <div
                        className="modal"
                        id="possibleAccident"
                        tabIndex="-1"
                        aria-labelledby="modalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered modal-xl ">
                            <div className="modal-content modalbgc">
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="btn-close btn-close-modal btn-close-white"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <PossibleAccident/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/" className="close">
                    <strong>&times;</strong>
                </Link>
            </div>
        </div>
    );
};

export default Health;
