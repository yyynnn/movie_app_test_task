import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { getWorkCenter, loadWorkCenter, getWorkCenterLoadingStatus } from "../../store/workCenter";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "../../store/errors";
import { Spinner } from "react-bootstrap";
import "../../css/button.css";
import "../../css/modalAll.css";
import { Container } from "react-bootstrap";
import { health, vectorPrev } from "../../img/indexImage";

const PossibleAccident = () => {
    const workCenter = useSelector(getWorkCenter());
    const dispatch = useDispatch();
    const isLoadingWorkCenter = useSelector(getWorkCenterLoadingStatus());
    const error = useSelector(getError());

    useEffect(() => {
        dispatch(loadWorkCenter());
    }, [dispatch]);
    if (isLoadingWorkCenter) {
        return <Spinner animation="border" variant="light" />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="col-lg-12 mx-auto wrap">
            <Container>
                <div className="title ">
                    <div>
                        <img src={health} alt="health" />
                    </div>
                    <h2 className="title-text title-text-form colorTextLightGray text-center ">
                        Possible accident
                    </h2>
                </div>

                <div className="form-wrap">
                    <form>
                        <div className="wrap-info">
                            <input type="date" name="date-possible-accident" />
                            <input type="time" name="time-possible-accident" />

                            <div className="select-wrapper">
                                <label className="select">
                                    <span>workcenter</span>
                                    <select className="select" name="workcenter-possible-accident">
                                        {!isLoadingWorkCenter &&
                                            workCenter.map((wc) => (
                                                <option value="" key={wc.id}>
                                                    {wc.number}
                                                </option>
                                            ))}
                                    </select>
                                </label>
                            </div>

                            <label className="input-text">
                                <span>short description</span>
                                <input
                                    type="text"
                                    name="text-possible-accident"
                                    placeholder="no waste sorting"
                                />
                            </label>
                        </div>

                        <div className="wrap-file">
                            <label className="file">
                                <input name="file-possible-accident" type="file" />
                            </label>
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

export default PossibleAccident;
