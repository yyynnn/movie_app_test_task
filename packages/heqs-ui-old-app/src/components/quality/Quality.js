import React from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import "../../css/button.css";
import "../../css/modalAll.css";
import './Quality.css';
import {Container} from "react-bootstrap";
import {quality} from "../../img/indexImage";

const Quality = () => {
    return (
        <div className="Main">
            <div className="popup col-lg-12">
                <Container>
                    <div className="wrap">
                        <div className="title">
                            <div>
                                <img src={quality} alt="quality"/>
                            </div>
                            <h2 className="title-text colorTextLightGray text-center ">Quality</h2>
                        </div>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center btn-wrap">
                            <button id="Audit" className="button quality">
                                Audit <br/> non-conformity
                            </button>
                            <button id="Product" className="button quality">Non-conforming product</button>
                            <button id="OTD" className="button quality">OTD</button>
                        </div>
                        <Link to="/" className="close">
                            <strong>&times;</strong>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Quality;
