import React, { useState } from "react";
import logo from "../img/Logo.svg";
import env from "../img/GroupEnvironment.svg";
import hes from "../img/GroupHealthSafety.svg";
import qual from "../img/GroupQuality.svg";
import listicon from "../img/Group.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const Main = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
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

                        <a href="#">
                            <img
                                className="d-block mx-auto mb-2 mt-2"
                                src={hes}
                                alt="2"
                                width="280"
                                height="380"
                                onClick={handleShow}
                            />
                        </a>
                        <img
                            className="d-block mx-auto mb-2 mt-2"
                            src={env}
                            alt="3"
                            width="280"
                            height="380"
                        />
                    </div>
                    <Link to="/list">
                        <img
                            className="d-block mx-auto mb-2 mt-2"
                            src={listicon}
                            alt="3"
                            width="50"
                            height="50"
                        />
                    </Link>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Main;
