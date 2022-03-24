import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./errors";
import taskReducer from "./task";

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

export default createStore;
