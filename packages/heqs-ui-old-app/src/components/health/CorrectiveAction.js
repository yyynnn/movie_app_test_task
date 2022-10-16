import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";

const CorrectiveAction = ({ handleChangeInput, handlePlus, handleMinus }) => {
    return (
        <>
            <div className="d-flex justify-content-around mb-2">
                <input
                    type="text"
                    className="corrective-actions-text"
                    name="corrective_actions_descr"
                    onChange={(index, event) => handleChangeInput(index, event)}
                />
                <input
                    type="text"
                    className="corrective-actions-text "
                    name="corrective_actions_name"
                    onChange={(index, event) => handleChangeInput(index, event)}
                />
                <input
                    type="date"
                    className="corrective-actions-text "
                    name="corrective_actions_date"
                    onChange={(index, event) => handleChangeInput(index, event)}
                />
                <div>
                    <button className="btn btn-primary mx-2 buttonCorrective" onClick={handlePlus}>
                        <div className="buttonCorrectiveText">+</div>
                    </button>
                    <button
                        className="btn btn-primary buttonCorrective"
                        onClick={(index) => handleMinus(index)}
                    >
                        <div className="buttonCorrectiveText">-</div>
                    </button>
                </div>
            </div>
        </>
    );
};
export default CorrectiveAction;
