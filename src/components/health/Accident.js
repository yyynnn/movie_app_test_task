import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import "../../css/button.css";
import "../../css/modalAll.css";
import { Container } from "react-bootstrap";
import { health, correction, vectorPrev } from "../../img/indexImage";

const Accident = () => {
    return (
        <div className="col-lg-12 mx-auto wrap">
            <Container>
                <div className="title">
                    <div>
                        <img src={health} alt="health" />
                    </div>
                    <h2 className="title-text-form title-text colorTextLightGray text-center ">
                        Accident
                    </h2>
                </div>

                <div className="form-wrap">
                    <form>
                        <div className="wrap-info">
                            <input type="date" name="date-accident" />
                            <input type="time" name="time-accident" />
                            <div className="select-wrapper">
                                <label className="select">
                                    <span>foreman</span>
                                    <select className="select" id="foreman" name="foreman-accident">
                                        <option value="first-accident">Ivan Petrov</option>
                                        <option value="second-accident">Alex Guse</option>
                                        <option value="third-accident">Seregey Ytkin</option>
                                    </select>
                                </label>
                            </div>

                            <div className="select-wrapper">
                                <label className="select">
                                    <span>workcenter</span>
                                    <select className="select" name="workcenter-accident">
                                        <option value="C705-accident">C705</option>
                                        <option value="C706-accident">C706</option>
                                        <option value="C707-accident">C707</option>
                                    </select>
                                </label>
                            </div>

                            <label className="input-text">
                                <span>damaged item</span>
                                <input
                                    name="damaged-accident"
                                    type="text"
                                    placeholder="Assembly table"
                                />
                            </label>
                        </div>

                        <div className="wrap-file">
                            <label className="file">
                                <input name="file-accident" type="file" />
                            </label>
                            <img src={correction} alt="correction" />
                        </div>
                        <button className="button submmit">Submit</button>
                    </form>
                </div>

                <Link to="/" className="close">
                    <strong>&times;</strong>
                </Link>
                {/* <Link to="/health" className="vectorNext">
					<img src={vectorNext} alt="next" className=" d-block mx-auto mb-2 mt-2" />
				</Link> */}
                <Link to="/health" className="vectorPrev">
                    <img src={vectorPrev} alt="next" className=" d-block mx-auto mb-2 mt-2" />
                </Link>
            </Container>
        </div>
    );
};

export default Accident;
