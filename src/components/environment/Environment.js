import React from "react";
import { Link } from "react-router-dom";
import "../../css/button.css";
import "../../css/modalAll.css";
import { Container } from "react-bootstrap";
import vectorNext from "../../img/vectorNext.png";
import { environment } from "../../img/indexImage";

const Environment = () => {
    return (
        <div className="col-lg-9 mx-auto my-5">
            <Container>
                <div className="title">
                    <div>
                        <img src={environment} alt="health" />
                    </div>
                    <h2 className="title-text colorTextLightGray text-center ">Environment</h2>
                </div>

                <div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
                    <button className="button">Accident</button>
                    <button className="button">Nearmiss</button>
                    <button className="button">Possible accident</button>
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

export default Environment;
