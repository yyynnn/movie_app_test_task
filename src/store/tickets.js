import { createSlice } from "@reduxjs/toolkit";

import ticketsService from "../services/tickets.service";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        received(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },

        loadTicketsRequested(state) {
            state.isLoading = true;
        },

        ticketsRequestFailed(state, action) {
            state.isLoading = false;
        }
    }
});

const { actions, reducer: ticketReducer } = ticketSlice;
const { received, loadTicketsRequested, ticketsRequestFailed } = actions;

export const loadTickets = () => async (dispatch) => {
    dispatch(loadTicketsRequested());
    try {
        const data = await ticketsService.fetch();
        dispatch(received(data));
    } catch (error) {
        dispatch(ticketsRequestFailed(error.message));
        dispatch(setError(error.message));
    }
};

export const getTickets = () => (state) => state.tickets.entities;
export const getTicketsLoadingStatus = () => (state) => state.tickets.isLoading;

export default ticketReducer;
