import { createAction, createSlice } from "@reduxjs/toolkit";

import ticketsService from "../services/tickets.service";
import { setError } from "./errors";

const initialState = { entities: [], ticket: {}, error: null, isLoading: true };

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
            state.error = action.payload;

            state.isLoading = false;
        },
        ticketAdded(state, action) {
            state.entities.push(action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

const { actions, reducer: ticketReducer } = ticketSlice;
const { received, loadTicketsRequested, ticketsRequestFailed, ticketAdded } = actions;
const ticketRequested = createAction("ticket/ticketRequested");

export const loadTickets = () => async (dispatch) => {
    dispatch(loadTicketsRequested());
    try {
        const { data } = await ticketsService.fetch();
        dispatch(received(data));
    } catch (error) {
        dispatch(ticketsRequestFailed(error));
        dispatch(setError(error));
    }
};

export const loadTicket = async (id, dispatch) => {
    try {
        const { data } = await ticketsService.fetchTicket(id);
        return data;
    } catch (error) {
        dispatch(ticketsRequestFailed(error));
    }
};

export const createTicket = (ticket) => async (dispatch) => {
    dispatch(ticketRequested());
    try {
        const data = await ticketsService.create(ticket);

        dispatch(ticketAdded(data));
    } catch (error) {
        dispatch(ticketsRequestFailed(error.response.data.message));
    }
};
export const getTicketLoadingStatus = () => (state) => state.tickets.isLoading;

export const getTickets = () => (state) => state.tickets.entities;
export const getTicketsLoadingStatus = () => (state) => state.tickets.isLoading;
export const getTicket = () => (state) => state.tickets.ticket;
export const getError = () => (state) => state.tickets.error;

export default ticketReducer;
