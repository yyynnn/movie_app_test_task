import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap";
import { getWorkCenter, loadWorkCenter, getWorkCenterLoadingStatus } from "../../store/workCenter";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "../../store/errors";
import { Spinner } from "react-bootstrap";
import "../../css/button.css";
import "../../css/modalAll.css";

import { health } from "../../img/indexImage";
import * as yup from "yup";
import { Formik } from "formik";
import { createTicket } from "../../store/tickets";
import { useHistory } from "react-router-dom";

const initialForm = {
    date_created: "",
    time_created: "",

    workcenter: "C201",
    selectedFile: ""
};

const PossibleAccident = () => {
    const [formData, setFormData] = useState(initialForm);
    const [selectedFile, setSelectedFile] = useState("");
    const workCenter = useSelector(getWorkCenter());
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoadingWorkCenter = useSelector(getWorkCenterLoadingStatus());
    const error = useSelector(getError());
    const accidentSchema = yup.object().shape({
        date_created: yup.string().required("Date is required"),
        time_created: yup.string().required("Time is required"),

        selectedFile: yup.mixed("not format").required("Photo is required")
    });
    useEffect(() => {
        dispatch(loadWorkCenter());
    }, [dispatch]);
    useEffect(() => {
        handleSubmitForm();
    }, [formData]);

    const handleSubmitForm = () => {
        if (formData.date_created) {
            const preparedData = {
                ...formData,
                ticket_class_id: 2,
                ticket_category_id: 8,
                selectedFile: selectedFile,
                workcenter_id: workCenter.find((w) => w.number === formData.workcenter).id
            };

            history.push("/health");
            console.log(preparedData);
            // dispatch(createTicket({ ...preparedData }));
        }
    };
    const convertFile = async (event) => {
        const result = await convertToBase64(event.target.files[0]);
        setSelectedFile(result);
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    if (isLoadingWorkCenter) {
        return <Spinner animation="border" variant="light" />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="col-lg-12 mx-auto wrap">
            <div className="title title-modal ">
                <div className="mt-1">
                    <img src={health} alt="health" />
                </div>
                <h2 className="title-text title-text-form colorTextLightGray text-center ">
                    Possible accident
                </h2>
            </div>
            <Formik
                initialValues={initialForm}
                onSubmit={(values) => setFormData({ ...formData, ...values })}
                validationSchema={accidentSchema}
            >
                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue
                    } = props;

                    return (
                        <div className="form-wrap">
                            <form onSubmit={handleSubmit}>
                                <div className="wrap-info">
                                    <div className="flex">
                                        <input
                                            type="date"
                                            id="date"
                                            name="date_created"
                                            value={values.date_created}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.date_created && touched.date_created && (
                                            <p className="error mt-1 mb-0">{errors.date_created}</p>
                                        )}
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="time"
                                            id="time"
                                            name="time_created"
                                            value={values.time_created}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.time_created && touched.time_created && (
                                            <p className="error mt-1 mb-0">{errors.time_created}</p>
                                        )}
                                    </div>

                                    <div className="select-wrapper">
                                        <div className="select">
                                            <span>workcenter</span>
                                            <select
                                                className="select"
                                                name="workcenter"
                                                value={values.workcenter}
                                                onChange={handleChange}
                                            >
                                                {!isLoadingWorkCenter &&
                                                    workCenter.map((wc) => (
                                                        <option key={wc.id}>{wc.number}</option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="damagedItem-wrapper">
                                        <input
                                            name="damaged-accident"
                                            type="text"
                                            placeholder="Assembly table"
                                            autoComplete="off"
                                            className="input-text"
                                        />
                                        <span className="damagedItem">short description</span>
                                    </div>
                                </div>
                                <div className="wrap-file">
                                    <label className="file flex">
                                        <input
                                            name="selectedFile"
                                            className="cursor-pointer"
                                            type="file"
                                            value=""
                                            onChange={(event) => {
                                                convertFile(event);
                                                setFieldValue(
                                                    "selectedFile",
                                                    event.target.files[0].name
                                                );
                                            }}
                                        />
                                        {selectedFile && (
                                            <img
                                                className="w-100 h-100 borderRounded"
                                                src={selectedFile}
                                                alt="preview"
                                            />
                                        )}
                                        {!selectedFile &&
                                            errors.selectedFile &&
                                            touched.selectedFile && (
                                                <p className="error mt-1 mb-0 errorFile">
                                                    {errors.selectedFile}
                                                </p>
                                            )}
                                    </label>
                                </div>
                                <button
                                    className="button submmit my-3 "
                                    data-bs-dismiss="modal"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
};

export default PossibleAccident;
