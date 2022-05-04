import React, { useEffect, useState } from "react";

import * as Icon from "react-bootstrap-icons";
import { useHistory, Link } from "react-router-dom";
import {
    getTickets,
    loadTickets,
    getTicketsLoadingStatus,
    getTicket,
    loadTicket
} from "../../store/tickets";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "../../store/errors";
import Accident from "../health/Accident";
import Nearmiss from "../health/Nearmiss";
import { Spinner } from "react-bootstrap";
import PossibleAccident from "../health/PossibleAccident";

const Tickets = () => {
    const state = useSelector(getTickets());
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector(getTicketsLoadingStatus());
    const error = useSelector(getError());

    const [selectedTicket, setSelectedTicket] = useState();
    const [selectedTicketData, setSelectedTicketData] = useState();
    const [btnClassYellow, setBtnClassYellow] = useState(false);
    const [btnClassGreen, setBtnClassGreen] = useState(false);
    const [btnClassBlue, setBtnClassBlue] = useState(false);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleRowClick = async ({ category, id }) => {
        setSelectedTicket(category);
        if (id) {
            const res = await loadTicket(id);
            setSelectedTicketData(res);
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        event.target.name === "Health&Safety"
            ? setBtnClassYellow((prevState) => (prevState = !prevState))
            : event.target.name === "environment"
            ? setBtnClassGreen((prevState) => (prevState = !prevState))
            : setBtnClassBlue((prevState) => (prevState = !prevState));

        if (selectedCategories.length > 0) {
            if (!selectedCategories.includes(event.target.name)) {
                setSelectedCategories((prevState) => [...prevState, event.target.name]);
            } else {
                setSelectedCategories(
                    selectedCategories.filter((category) => category !== event.target.name)
                );
            }
        } else {
            setSelectedCategories((prevState) => [...prevState, event.target.name]);
        }
    };

    const filterTickets = () => {
        let result = [];
        if (selectedCategories.length > 0) {
            for (const category of selectedCategories) {
                if (
                    state.filter((ticket) => ticket.class.toLowerCase() === category.toLowerCase())
                        .length > 0
                ) {
                    result = [
                        ...result,

                        state.filter(
                            (ticket) => ticket.class.toLowerCase() === category.toLowerCase()
                        )
                    ];
                }
            }

            setFilteredTickets(...result);
        } else {
            setFilteredTickets([]);
        }
    };
    useEffect(() => {
        dispatch(loadTickets());
    }, [dispatch]);

    useEffect(() => {
        filterTickets();
    }, [selectedCategories]);

    if (isLoading) {
        return <Spinner animation="border" variant="light" />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="colorBg">
            <div className="px-4 py-3 text-center wrap">
                <h1 className="display-6  fw-bold colorTextLightGray m-3">Tickets</h1>
                <div className="col-lg-6 mx-auto ">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3">
                        <button
                            className={
                                btnClassYellow ? `filter-btn-yellow clicked` : `filter-btn-yellow`
                            }
                            name="Health&amp;Safety"
                            onClick={(event) => handleClick(event)}
                        >
                            OHS
                        </button>
                        <button
                            className={
                                btnClassGreen ? `filter-btn-green clicked` : `filter-btn-green`
                            }
                            name="environment"
                            onClick={(event) => handleClick(event)}
                        >
                            Environment
                        </button>
                        <button
                            className={btnClassBlue ? `filter-btn-blue clicked` : `filter-btn-blue`}
                            name="quality"
                            onClick={(event) => handleClick(event)}
                        >
                            Quality
                        </button>
                    </div>
                </div>

                <table className="table table-hover colorTextLightGray table-borderless hide-scroll table-height ">
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

                    <tbody className="table-color ">
                        {(!selectedCategories.length
                            ? state
                            : !filteredTickets
                            ? []
                            : [...filteredTickets]
                        ).map((el) => (
                            <tr
                                key={el.id}
                                className="table-bg"
                                onClick={() => handleRowClick({ category: el.category, id: el.id })}
                                data-bs-target="#ticketModal"
                                data-bs-toggle="modal"
                            >
                                <td>
                                    {el.class === "Environment" ? (
                                        <Icon.CircleFill color="#C9C906" />
                                    ) : el.class === "Health&Safety" ? (
                                        <Icon.CircleFill color="#FFCC33" />
                                    ) : (
                                        <Icon.CircleFill color="#589BBC" />
                                    )}
                                </td>
                                <td>{el.date_created}</td>
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

                <div
                    className="modal fade "
                    id="ticketModal"
                    tabIndex="-1"
                    aria-labelledby="modalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content modalbgc border-radius">
                            <div className="modal-header border-radius">
                                <button
                                    type="button"
                                    className="btn-close btn-close-modal btn-close-white"
                                    onClick={() => setSelectedTicketData(null)}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body ">
                                {selectedTicket === "Accident" ? (
                                    <Accident selectedTicketData={selectedTicketData} />
                                ) : selectedTicket === "Nearmiss" ? (
                                    <Nearmiss selectedTicketData={selectedTicketData} />
                                ) : (
                                    <PossibleAccident />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="btn btn-secondary m-2 p-1"
                    onClick={() => history.push("/database")}
                >
                    Back
                </button>
                <Link to="/" className="close">
                    <strong>&times;</strong>
                </Link>
            </div>
        </div>
    );
};

export default Tickets;
