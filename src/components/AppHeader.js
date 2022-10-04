import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../img/indexImage";
import { Container } from "react-bootstrap";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.css";
import "../css/AppHeader.css";

const AppHeader = () => {
    return (
        <>
            <div className="header">
                <div className="popup col-lg-12">
                    <Container>
                        <div className="username">
                            {/* <p className="mb-0">George Danilyants</p>
                    <p className="mb-0">Peikko Russia</p> */}
                            <button
                                id="Login"
                                className="buttonLogin"
                                to="/"
                                data-bs-target="#login"
                                data-bs-toggle="modal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="currentColor"
                                    className="bi bi-box-arrow-in-right"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                                    />
                                </svg>
                            </button>
                            <div
                                className="modal fade modal-backdrop-bg"
                                id="login"
                                tabIndex="-1"
                                aria-labelledby="modalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-centered modal-dialog-login ">
                                    <Container>
                                        <div className="modal-content modal-content-bg">
                                            <div className="modal-header">
                                                {/* <div className="title title-modal">
                                                    <h2 className="title-text-form title-text colorTextLightGray text-center">
                                                        Login
                                                    </h2>
                                                </div> */}
                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-modal btn-close-white"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                />
                                            </div>
                                            <div className="modal-body">
                                                <Login />
                                            </div>
                                        </div>
                                    </Container>
                                </div>
                            </div>
                        </div>
                    </Container>
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
