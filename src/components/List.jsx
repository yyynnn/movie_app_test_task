import React, { useEffect } from "react";

import ListGroup from "react-bootstrap/ListGroup";
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

const List = () => {
	const state = useSelector(getTasks());
	const dispatch = useDispatch();

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
			<div className="px-4 py-5 text-center" >
				<button onClick={addTask}>Add task</button>
				<ListGroup>
					{state.map((el) => (
						<ListGroup.Item key={el.id}>
							<p>{el.title}</p>
							<p>{`Completed: ${el.completed}`}</p>
							<button onClick={() => dispatch(completeTask(el.id))}>
								Complete task
							</button>
							<button onClick={() => changeTitlle(el.id)}>Change title</button>
							<button onClick={() => deleteTask(el.id)}>Delete task</button>
							<hr />
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
		</div>
	);
};

export default List;
