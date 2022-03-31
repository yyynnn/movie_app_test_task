import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import "../../css/button.css";
import "../../css/modalAll.css";
import { health, vectorNext } from "../../img/indexImage";

const Health = () => {
    return (
        <div className="col-lg-9 mx-auto my-5">
            <div className="title">
                <div>
                    <img src={health} alt="health" />
                </div>
                <h2 className="title-text colorTextLightGray text-updae ">
                    Occupational health and safety
                </h2>
            </div>

            <div className="d-grid gap-4 d-sm-flex justify-content-sm-center">
                <Link className="link" to="/accident">
                    <button className="button">Accident</button>
                </Link>
                <Link className="link" to="/nearmiss">
                    <button className="button">Nearmiss</button>
                </Link>
                <Link className="link" to="/possibleAccident">
                    <button className="button">Possible accident</button>
                </Link>
            </div>
            <Link to="/" className="close">
                <strong>&times;</strong>
            </Link>
            <Link to="/" className="vectorNext">
                {" "}
                <img src={vectorNext} alt="next" className=" d-block mx-auto mb-2 mt-2" />
            </Link>
        </div>
    );
};

export default Health;
