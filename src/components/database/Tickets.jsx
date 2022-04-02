import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useHistory, Link } from "react-router-dom";
import { getTickets, loadTickets, getTicketsLoadingStatus } from "../../store/tickets";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "../../store/errors";
import { Environment, Quality } from "../../img/taskImages/taskImages.js";
import { Spinner } from "react-bootstrap";

const Tickets = () => {
    const state = useSelector(getTickets());
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector(getTicketsLoadingStatus());
    const error = useSelector(getError());
    const [btnClass, setBtnClass] = useState(false);

    useEffect(() => {
        dispatch(loadTickets());
    }, [dispatch]);

    if (isLoading) {
        return <Spinner animation="border" variant="light" />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="colorBg">
            <div className="px-4 py-3 text-center">
                <h1 className="display-6  fw-bold colorTextLightGray ">Tickets</h1>
                <div className="col-lg-6 mx-auto ">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button
                            className={btnClass ? `filter-btn clicked` : `filter-btn`}
                            onClick={() => setBtnClass((prevState) => (prevState = !prevState))}
                        >
                            OHS
                        </button>
                        <Link to="/">
                            <img
                                className="mx-auto "
                                src={Environment}
                                alt="environment"
                                height="50"
                            />
                        </Link>
                        <Link to="/">
                            <img className="mx-auto " src={Quality} alt="quality" height="50" />
                        </Link>
                    </div>
                </div>

                <table className="table table-hover colorTextLightGray table-borderless ">
                    <thead className="table-th-font-weight table-group-separator-color">
                        <tr>
                            <th className="fw-normal fs-5 th-sm" scope="col">
                                Class
                            </th>
                            <th className="fw-normal fs-5" scope="col">
                                Date
                            </th>
                            <th className="fw-normal fs-5 " scope="col">
                                Category
                            </th>
                            <th className="fw-normal fs-5" scope="col">
                                Workcenter
                            </th>

                            <th className="fw-normal fs-5" scope="col">
                                Corrective Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-color">
                        {state.map((el) => (
                            <tr key={el.id} className="table-bg">
                                <td>
                                    {el.class === "Environment" ? (
                                        <Icon.CircleFill color="#C9C906" />
                                    ) : el.class === "OHS" ? (
                                        <Icon.CircleFill color="#FFCC33" />
                                    ) : (
                                        <Icon.CircleFill color="#589BBC" />
                                    )}
                                </td>
                                <td>{el.date}</td>
                                <td>{el.category}</td>
                                <td>{el.workcenter}</td>

                                <td>
                                    {el.correctiveActions ? (
                                        <Icon.CircleFill color="#60BC58" />
                                    ) : (
                                        <Icon.Circle color="#60BC58" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className="btn btn-secondary m-2 p-1"
                    onClick={() => history.push("/database")}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Tickets;
