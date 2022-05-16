import React, {useEffect, useState} from "react";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import * as bootstrap from "bootstrap";
import {getWorkCenter, loadWorkCenter, getWorkCenterLoadingStatus} from "../../store/workCenter";
import {getEmployee, loadEmployee, getEmployeeLoadingStatus} from "../../store/employee";
import {createTicket} from "../../store/tickets";
import {useSelector, useDispatch} from "react-redux";
import * as yup from "yup";
import {Formik} from "formik";
import {getError} from "../../store/errors";
import {Spinner} from "react-bootstrap";
import "../../css/button.css";
import "../../css/modalAll.css";
import imageCompression from "browser-image-compression";
import {health, vectorPrev} from "../../img/indexImage";
// import { useHistory, useLocation } from "react-router-dom";

const Accident = ({selectedTicketData}) => {
    // console.log(selectedTicketData);
    const workCenter = useSelector(getWorkCenter());
    const employee = useSelector(getEmployee());
    const isLoadingWorkCenter = useSelector(getWorkCenterLoadingStatus());
    const isLoadingEmployee = useSelector(getEmployeeLoadingStatus());

    const initialForm = selectedTicketData
        ? {
            date_created: selectedTicketData.date_created,
            time_created: selectedTicketData.time_created,
            foreman:
                !isLoadingEmployee &&
                `${employee.find((e) => e.id === selectedTicketData.foreman_id).name} ${
                    employee.find((e) => e.id === selectedTicketData.foreman_id).surname
                }`,
            workcenter:
                !isLoadingWorkCenter &&
                workCenter.find((e) => e.id === selectedTicketData.workcenter_id).number,
            selectedFile: "",
            correction: selectedTicketData.correction,
            damaged_item: selectedTicketData.damaged_item
        }
        : {
            date_created: "",
            time_created: "",
            foreman: "Ivan Petrov",
            workcenter: "C201",
            selectedFile: "",
            correction: "",
            damaged_item: ""
        };
    const [formData, setFormData] = useState(initialForm);

    const [selectedFile, setSelectedFile] = useState("");

    const dispatch = useDispatch();

    const error = useSelector(getError());

    const accidentSchema = yup.object().shape({
        date_created: yup.string().required("Date is required"),
        time_created: yup.string().required("Time is required"),
        correction: yup
            .string()
            .max(256, "Description is too long")
            .required("Correction description is required"),
        selectedFile: yup.mixed("not format").required("Photo is required"),
        damaged_item: yup.string().required("Damaged item is required")
    });

    function handleCloseModal() {
        const elementModal = document.getElementById("accident");
        const modal = bootstrap.Modal.getInstance(elementModal);
        modal.hide();
        setSelectedFile("");
    }

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true
    };

    const convertFile = async (event) => {
        const compressedFile = await imageCompression(event.target.files[0], options);
        const result = await convertToBase64(compressedFile);
        setSelectedFile(result);
    };

    useEffect(() => {
        dispatch(loadWorkCenter());
        dispatch(loadEmployee());
    }, [dispatch]);

    useEffect(() => {
        const handleSubmitForm = () => {
            if (formData.date_created) {
                const preparedData = {
                    ...formData,
                    ticket_class_id: 2,
                    ticket_category_id: 5,
                    photo: selectedFile,
                    workcenter_id: workCenter.find((w) => w.number === formData.workcenter).id,
                    foreman_id: employee.find((e) => `${e.name} ${e.surname}` === formData.foreman)
                        .id
                };

                // console.log(preparedData);

                dispatch(createTicket({...preparedData}));
                handleCloseModal();
            }
        };
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
        return <Spinner animation="border" variant="light"/>;
    }
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="col-lg-12 mx-auto wrap">
            <Formik
                initialValues={initialForm}
                enableReinitialize={true}
                onSubmit={(values, {resetForm}) => {
                    setFormData({...formData, ...values});
                    resetForm({values: ""});
                }}
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
                                        <div className="select ">
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
                                    <div className="select-wrapper ">
                                        <div className="select workcenter">
                                            <span>workcenter</span>
                                            <select
                                                className="select workcenter"
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
                                            name="damaged_item"
                                            type="text"
                                            placeholder="Assembly table"
                                            autoComplete="off"
                                            className="input-text"
                                            value={values.damaged_item}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
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
                                                className="w-100 h-100 borderRounded"
                                                src={selectedFile}
                                                alt="preview"
                                            />
                                        )}
                                        {!selectedFile &&
                                        errors.selectedFile &&
                                        touched.selectedFile && (
                                            <p className="error mt-1 errorFile mb-0">
                                                {errors.selectedFile}
                                            </p>
                                        )}
                                    </label>

                                    <div className="flex textarea">
                                        <textarea
                                            type="text"
                                            rows="5"
                                            autoComplete="off"
                                            placeholder="Correction..."
                                            className="correction p-2"
                                            name="correction"
                                            value={values.correction}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.correction && touched.correction && (
                                            <p className="error mt-1 mb-0">{errors.correction}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="button submmit my-3"
                                    type="submit"
                                    data-bs-dismmiss="modal"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    );
                }}
            </Formik>

            {/* <Link to="/" className="close">
                <strong>&times;</strong>
            </Link>

            <Link to="/health" className="vectorPrev">
                <img src={vectorPrev} alt="next" className=" d-block mx-auto mb-2 mt-2" />
            </Link> */}
        </div>
    );
};

export default Accident;
