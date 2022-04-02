import React, { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import { useHistory, Link } from "react-router-dom";
import { getTickets, loadTickets, getTicketsLoadingStatus } from "../store/tickets";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "../store/errors";
import { Environment, OHS, Quality } from "../img/taskImages/taskImages.js";

const Tickets = () => {
    const state = useSelector(getTickets());
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector(getTicketsLoadingStatus());
    const error = useSelector(getError());
    useEffect(() => {
        dispatch(loadTickets());
    }, [dispatch]);

    if (isLoading) {
        return <h1>Loading...</h1>;
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
                        <Link to="/">
                            <img
                                className="mx-auto mb-2 mt-5"
                                src={OHS}
                                alt="OHS"
                                width="200"
                                height="50"
                            />
                        </Link>
                        <Link to="/">
                            <img
                                className="mx-auto mb-2 mt-5"
                                src={Environment}
                                alt="environment"
                                width="300"
                                height="50"
                            />
                        </Link>
                        <Link to="/">
                            <img
                                className="mx-auto mb-2 mt-5 p-1"
                                src={Quality}
                                alt="quality"
                                width="200"
                                height="50"
                            />
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
                                        <Icon.CircleFill color="lightgreen" />
                                    ) : (
                                        <Icon.Circle color="lightgreen" />
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
                    Home
                </button>
            </div>
        </div>
    );
};

export default Tickets;
