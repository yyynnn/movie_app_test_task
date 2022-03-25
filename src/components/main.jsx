import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context("../img", false, /\.(png|jpe?g|svg)$/));

const Main = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <div className="colorBg">
            <div className="px-4 py-5 text-center">
                <img
                    className="d-block mx-auto mb-2 mt-2"
                    src={images[4].default}
                    alt="logo"
                    width="200"
                    height="40"
                />
                <p className="display-6 colorText">Build the statistics. Improve yourself.</p>
                <div className="col-lg-6 mx-auto">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <img
                            className="d-block mx-auto mb-2 mt-2"
                            src={images[3].default}
                            alt="1"
                            width="280"
                            height="380"
                        />

                        <a href="#">
                            <img
                                className="d-block mx-auto mb-2 mt-2 "
                                src={images[2].default}
                                alt="2"
                                width="280"
                                height="380"
                                onClick={handleShow}
                            />
                        </a>
                        <img
                            className="d-block mx-auto mb-2 mt-2"
                            src={images[1].default}
                            alt="3"
                            width="280"
                            height="380"
                        />
                    </div>
                    <Link to="/list" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={images[0].default}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={images[8].default}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={images[7].default}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={images[9].default}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={images[5].default}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={images[6].default}
                            alt="3"
                            width="40"
                            height="40"
                        />
                    </Link>
                    <Link to="/" className="p-2">
                        <img
                            className="mx-auto mb-2 mt-2"
                            src={images[10].default}
                            alt="3"
                            width="40"
                            height="40"
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
