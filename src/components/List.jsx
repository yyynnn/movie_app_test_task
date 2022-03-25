import React, { useEffect } from "react";

import { useHistory, Link } from "react-router-dom";
import {
    titleChanged,
    taskDeleted,
    completeTask,
    getTasks,
    loadTasks,
    getTasksLoadingStatus,
    createTask
} from "../store/task";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "../store/errors";
// function importAll(r) {
//     return r.keys().map(r);
// }

// const images = importAll(require.context("../img/listImages", false, /\.(png|jpe?g|svg)$/));

const List = () => {
    const state = useSelector(getTasks());
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const changeTitlle = (taskId) => {
        dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };

    const addTask = () => {
        dispatch(createTask({ userId: 1, title: "task" + Date.now(), completed: false }));
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className="colorBg">
            <div className="px-4 py-5 text-center">
                <h1 className="display-6 colorText fw-bold ">Corrective actions</h1>
                <div className="col-lg-6 mx-auto">
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/">
                            <img
                                className="mx-auto mb-2 mt-4"
                                src={""}
                                alt="3"
                                width="100"
                                height="50"
                            />
                        </Link>
                        <Link to="/">
                            <img
                                className="mx-auto mb-2 mt-4"
                                src={""}
                                alt="3"
                                width="300"
                                height="50"
                            />
                        </Link>
                        <Link to="/">
                            <img
                                className="mx-auto mb-2 mt-4 p-1"
                                src={""}
                                alt="3"
                                width="100"
                                height="50"
                            />
                        </Link>
                    </div>
                </div>

                <table className="table table-hover  table-borderless">
                    <thead className="colorText table-th-font-weight table-group-separator-color">
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
                                Description
                            </th>
                            <th className="fw-normal fs-5" scope="col">
                                Responsible
                            </th>
                            <th className="fw-normal fs-5" scope="col">
                                Due date
                            </th>
                            <th className="fw-normal fs-5" scope="col">
                                Status
                            </th>
                            <th className="fw-normal fs-5" scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-color">
                        {state.map((el) => (
                            <tr key={el.id} className="colorText table-bg">
                                <td>
                                    <i className="bi bi-circle"></i>
                                </td>
                                <td>03.25.2022</td>
                                <td>Accident</td>
                                <td>C112</td>
                                <td>{el.title}</td>
                                <td>User</td>
                                <td>03.25.2022</td>
                                <td>
                                    <i
                                        className={"bi bi-circle" + (el.completed ? "-fill" : "")}
                                    ></i>
                                </td>
                                <td className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => dispatch(completeTask(el.id))}
                                    >
                                        Complete
                                    </button>
                                    <br />
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => changeTitlle(el.id)}
                                    >
                                        Change
                                    </button>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => deleteTask(el.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-secondary m-2 p-1" onClick={addTask}>
                    Add task
                </button>
                <button className="btn btn-secondary m-2 p-1" onClick={() => history.push("/")}>
                    Home
                </button>
            </div>
        </div>
    );
};

export default List;
