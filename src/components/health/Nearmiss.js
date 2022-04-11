import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { getWorkCenter, loadWorkCenter, getWorkCenterLoadingStatus } from "../../store/workCenter";
import { getEmployee, loadEmployee, getEmployeeLoadingStatus } from "../../store/employee";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "../../store/errors";
import { Spinner } from "react-bootstrap";
import "../../css/button.css";
import "../../css/modalAll.css";
import { Container } from "react-bootstrap";
import { health, vectorPrev, correctionUse } from "../../img/indexImage";

const Nearmiss = () => {
    const workCenter = useSelector(getWorkCenter());
    const employee = useSelector(getEmployee());
    const dispatch = useDispatch();
    const isLoadingWorkCenter = useSelector(getWorkCenterLoadingStatus());
    const isLoadingEmployee = useSelector(getEmployeeLoadingStatus());
    const error = useSelector(getError());

    useEffect(() => {
        dispatch(loadWorkCenter());
        dispatch(loadEmployee());
    }, [dispatch]);
    if (isLoadingWorkCenter || isLoadingEmployee) {
        return <Spinner animation="border" variant="light" />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="col-lg-12 mx-auto">
            <Container>
                <div className="wrap">
                    <div className="title">
                        <div>
                            <img src={health} alt="health" />
                        </div>
                        <h2 className="title-text title-text-form colorTextLightGray text-center ">
                            Nearmiss
                        </h2>
                    </div>

                    <div className="form-wrap">
                        <form>
                            <div className="wrap-info">
                                <input type="date" name="date-nearmiss" />
                                <input type="time" name="time-nearmiss" />

                                <div className="select-wrapper">
                                    <label className="select">
                                        <span>workcenter</span>
                                        <select className="select" name="workcenter-nearmiss">
                                            {!isLoadingWorkCenter &&
                                                workCenter.map((wc) => (
                                                    <option value="" key={wc.id}>
                                                        {wc.number}
                                                    </option>
                                                ))}
                                        </select>
                                    </label>
                                </div>

                                <div className="select-wrapper">
                                    <label className="select">
                                        <span>foreman</span>
                                        <select
                                            className="select"
                                            id="foreman"
                                            name="foreman-nearmiss"
                                        >
                                            {!isLoadingEmployee &&
                                                employee.map((e) => (
                                                    <option value="first-accident" key={e.id}>
                                                        {`${e.name}  ${e.surname}`}
                                                    </option>
                                                ))}
                                        </select>
                                    </label>
                                </div>

                                <label className="input-text">
                                    <span>damaged item</span>
                                    <input
                                        type="text"
                                        name="text-nearmiss"
                                        placeholder="Combilift 12t"
                                    />
                                </label>
                            </div>

                            <div className="wrap-file">
                                <label className="file">
                                    <input name="file-nearmiss" type="file" />
                                </label>
                                <img src={correctionUse} alt="correction" />
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
                </div>
            </Container>
        </div>
    );
};

export default Nearmiss;
