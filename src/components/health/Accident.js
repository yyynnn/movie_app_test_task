import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { getWorkCenter, loadWorkCenter, getWorkCenterLoadingStatus } from "../../store/workCenter";
import { getEmployee, loadEmployee, getEmployeeLoadingStatus } from "../../store/employee";
import { createTicket } from "../../store/tickets";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import { getError } from "../../store/errors";
import { Spinner } from "react-bootstrap";
import "../../css/button.css";
import "../../css/modalAll.css";
import { Container } from "react-bootstrap";
import { health, vectorPrev } from "../../img/indexImage";

const initialForm = {
    date_created: "",
    time_created: "",
    foreman: "Ivan Petrov",
    workcenter: "C201",

    correction: ""
};

const Accident = () => {
    const [formData, setFormData] = useState(initialForm);
    const workCenter = useSelector(getWorkCenter());
    const employee = useSelector(getEmployee());

    const dispatch = useDispatch();
    const isLoadingWorkCenter = useSelector(getWorkCenterLoadingStatus());
    const isLoadingEmployee = useSelector(getEmployeeLoadingStatus());
    const error = useSelector(getError());

    const accidentSchema = yup.object().shape({
        date_created: yup.string().required("Date is required"),
        time_created: yup.string().required("Time is required"),
        correction: yup
            .string()
            .max(256, "Description is too long")
            .required("Correction description is required")
        // workcenter: yup.string().required("Workcenter is required")
    });

    const handleSubmitForm = () => {
        if (formData.date_created) {
            const preparedData = {
                ...formData,
                ticket_class_id: 2,
                ticket_category_id: 5,
                workcenter_id: workCenter.find((w) => w.number === formData.workcenter).id,
                foreman_id: employee.find((e) => `${e.name} ${e.surname}` === formData.foreman).id
            };
            console.log(preparedData);
            // dispatch(createTicket({ ...preparedData }));
        }
    };

    useEffect(() => {
        dispatch(loadWorkCenter());
        dispatch(loadEmployee());
    }, [dispatch]);

    useEffect(() => {
        handleSubmitForm();
    }, [formData]);

    if (isLoadingWorkCenter || isLoadingEmployee) {
        return <Spinner animation="border" variant="light" />;
    }
    if (error) {
        return <p>{error}</p>;
    }

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
                            handleSubmit
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
                                                <p className="error mt-1">{errors.date_created}</p>
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
                                                <p className="error mt-1">{errors.time_created}</p>
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
                                        <label className="file">
                                            <input
                                                name="file-accident"
                                                className="cursor-pointer"
                                                type="file"
                                            />
                                        </label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="Correction..."
                                                className="correction"
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
                                    <button className="button submmit" type="submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        );
                    }}
                </Formik>
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
            <>
                {/* <p>{error}</p> */}
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
                                    handleSubmit
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
                                                    {errors.date_created &&
                                                        touched.date_created && (
                                                            <p className="error mt-1">
                                                                {errors.date_created}
                                                            </p>
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
                                                    {errors.time_created &&
                                                        touched.time_created && (
                                                            <p className="error mt-1">
                                                                {errors.time_created}
                                                            </p>
                                                        )}
                                                </div>

                                                <div className="damagedItem-wrapper">
                                                    <input
                                                        name="damaged-accident"
                                                        type="text"
                                                        placeholder="Assembly table"
                                                        className="input-text"
                                                    />
                                                    <span className="damagedItem">
                                                        damaged item
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="wrap-file">
                                                <label className="file">
                                                    <input
                                                        name="file-accident"
                                                        className="cursor-pointer"
                                                        type="file"
                                                    />
                                                </label>
                                                <div className="flex">
                                                    <input
                                                        type="text"
                                                        autoComplete="off"
                                                        placeholder="Correction..."
                                                        className="correction"
                                                        name="correction"
                                                        value={values.correction}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    {errors.correction && touched.correction && (
                                                        <p className="error mt-1">
                                                            {errors.correction}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <button className="button submmit" type="submit">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                );
                            }}
                        </Formik>
                    </Container>
                </div>
            </>
        </div>
    );
};

export default Accident;
