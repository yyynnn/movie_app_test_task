import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./errors";
import taskReducer from "./task";
import ticketReducer from "./tickets";

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer,
    tickets: ticketReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

export default createStore;
