import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { env, hes, qual } from "../img/indexImage";

const Main = () => {
    return (
        <div className="colorBg">
            <Container>
                <div className=" text-center">
                    <div className="col-lg-6 mx-auto">
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <Link to="/quality">
                                <img
                                    className="d-block mx-auto mb-2 mt-2"
                                    src={qual}
                                    alt="1"
                                    width="280"
                                    height="380"
                                />
                            </Link>

                            <Link to="/health">
                                <img
                                    className="d-block mx-auto mb-2 mt-2"
                                    src={hes}
                                    alt="2"
                                    width="280"
                                    height="380"
                                    // onClick={handleShow}
                                />
                            </Link>

                            <Link to="/environment">
                                <img
                                    className="d-block mx-auto mb-2 mt-2"
                                    src={env}
                                    alt="3"
                                    width="280"
                                    height="380"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Main;
