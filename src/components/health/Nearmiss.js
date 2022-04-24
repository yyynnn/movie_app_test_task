import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { getWorkCenter, loadWorkCenter, getWorkCenterLoadingStatus } from "../../store/workCenter";
import { getEmployee, loadEmployee, getEmployeeLoadingStatus } from "../../store/employee";
import { useSelector, useDispatch } from "react-redux";
import { createTicket } from "../../store/tickets";
import * as yup from "yup";
import { Formik } from "formik";
import { getError } from "../../store/errors";
import { Spinner } from "react-bootstrap";
import "../../css/button.css";
import "../../css/modalAll.css";
import { Container } from "react-bootstrap";
import { health, vectorPrev } from "../../img/indexImage";
import { useHistory } from "react-router-dom";

const initialForm = {
    date_created: "",
    time_created: "",
    foreman: "Ivan Petrov",
    workcenter: "C201",
    selectedFile: "",
    correction: ""
};
const Nearmiss = () => {
    const [formData, setFormData] = useState(initialForm);
    const [selectedFile, setSelectedFile] = useState("");
    const workCenter = useSelector(getWorkCenter());
    const employee = useSelector(getEmployee());
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoadingWorkCenter = useSelector(getWorkCenterLoadingStatus());
    const isLoadingEmployee = useSelector(getEmployeeLoadingStatus());
    const error = useSelector(getError());

    const accidentSchema = yup.object().shape({
        date_created: yup.string().required("Date is required"),
        time_created: yup.string().required("Time is required"),
        correction: yup
            .string()
            .max(256, "Description is too long")
            .required("Correction description is required"),
        selectedFile: yup.mixed("not format").required("Photo is required")
    });
    const handleSubmitForm = () => {
        if (formData.date_created) {
            const preparedData = {
                ...formData,
                ticket_class_id: 2,
                ticket_category_id: 7,
                selectedFile: selectedFile,
                workcenter_id: workCenter.find((w) => w.number === formData.workcenter).id,
                foreman_id: employee.find((e) => `${e.name} ${e.surname}` === formData.foreman).id
            };

            history.push("/health");
            // console.log(preparedData);
            dispatch(createTicket({ ...preparedData }));
        }
    };

    const convertFile = async (event) => {
        const result = await convertToBase64(event.target.files[0]);
        setSelectedFile(result);
    };

    useEffect(() => {
        dispatch(loadWorkCenter());
        dispatch(loadEmployee());
    }, [dispatch]);

    useEffect(() => {
        handleSubmitForm();
    }, [formData]);

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
    if (isLoadingWorkCenter || isLoadingEmployee) {
        return <Spinner animation="border" variant="light" />;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="col-lg-12 mx-auto wrap">
            <div className="title">
                <div>
                    <img src={health} alt="health" />
                </div>
                <h2 className="title-text title-text-form colorTextLightGray text-center ">
                    Nearmiss
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
                                            <span>foreman</span>
                                            <select
                                                className="select"
                                                id="foreman"
                                                name="foreman"
                                                value={values.foreman}
                                                onChange={handleChange}
                                            >
                                                {!isLoadingEmployee &&
                                                    employee.map((e) => (
                                                        <option key={e.id}>
                                                            {`${e.name} ${e.surname}`}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
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
                                        <span className="damagedItem">damaged item</span>
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
                                                className="w-100 h-100"
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

                                    <div className="flex textarea">
                                        <textarea
                                            type="text"
                                            raws="5"
                                            autoComplete="off"
                                            placeholder="Correction..."
                                            className="correction p-2"
                                            name="correction"
                                            value={values.correction}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.correction && touched.correction && (
                                            <p className="error mt-1">{errors.correction}</p>
                                        )}
                                    </div>
                                </div>
                                <button className="button submmit my-3" type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Formik>
            {/* <div className="form-wrap">
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
                    </div> */}

            <Link to="/" className="close">
                <strong>&times;</strong>
            </Link>

            <Link to="/health" className="vectorPrev">
                <img src={vectorPrev} alt="next" className=" d-block mx-auto mb-2 mt-2" />
            </Link>
        </div>
    );
};

export default Nearmiss;
