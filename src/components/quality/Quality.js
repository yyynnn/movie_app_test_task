import React from "react";
import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

import "../../css/button.css";
import "../../css/modalAll.css";
import { Container } from "react-bootstrap";
import vectorNext from "../../img/vectorNext.png";
import { quality } from "../../img/indexImage";

const Quality = () => {
    return (
        <div className="col-lg-9 mx-auto">
            <Container>
                <div className="title">
                    <div>
                        <img src={quality} alt="quality" />
                    </div>
                    <h2 className="title-text colorTextLightGray text-center ">Quality</h2>
                </div>

                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    <button className="button">
                        Audit <br /> non-conformity
                    </button>
                    <button className="button">Non-conforming product</button>
                    <button className="button">OTD</button>
                </div>

                <Link to="/" className="close">
                    <strong>&times;</strong>
                </Link>
                <Link to="/" className="vectorNext">
                    {" "}
                    <img src={vectorNext} alt="next" className=" d-block mx-auto mb-2 mt-2" />
                </Link>
            </Container>
        </div>
    );
};

export default Quality;
