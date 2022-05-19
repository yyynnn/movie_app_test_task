import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";

const CorrectiveActions = ({ selectedTicketData }) => {
    const [correctiveAction, setCorrectiveAction] = useState({
        description: "",
        name: "",
        date: ""
    });
    const [correctiveActions, setCorrectiveActions] = useState([]);

    const handleCorrectiveChange = (event) => {
        if (event.target.name === "corrective_actions_name") {
            setCorrectiveAction((prevState) => ({ ...prevState, name: event.target.value }));
        }
        if (event.target.name === "corrective_actions_descr") {
            setCorrectiveAction((prevState) => ({
                ...prevState,
                description: event.target.value
            }));
        }
        if (event.target.name === "corrective_actions_date") {
            setCorrectiveAction((prevState) => ({ ...prevState, date: event.target.value }));
        }

        console.log(correctiveActions);
    };

    return (
        <>
            <div className="d-flex mb-2 justify-content-around">
                <div>Corrective actions</div>
                <div>Responsible</div>
                <div>Due Date</div>
                <div></div>
            </div>
            <div className="d-flex mb-2">
                <input
                    type="text"
                    className="corrective-actions-text"
                    name="corrective_actions_descr"
                    onChange={(event) => handleCorrectiveChange(event)}
                />
                <input
                    type="text"
                    className="corrective-actions-text"
                    name="corrective_actions_name"
                    onChange={(event) => handleCorrectiveChange(event)}
                />
                <input
                    type="date"
                    className="corrective-actions-text me-5"
                    name="corrective_actions_date"
                    onChange={(event) => handleCorrectiveChange(event)}
                />
                <div>
                    <Icon.Circle color="#60BC58" className="corrective-actions-circle" />
                </div>
            </div>
        </>
    );
};
export default CorrectiveActions;
