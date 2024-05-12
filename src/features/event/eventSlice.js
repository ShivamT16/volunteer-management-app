import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async () => {
        const response = await axios.get("https://387a8059-3923-4337-9a50-21157b544a01-00-1sgspvqiuj4tj.spock.replit.dev/events",)
        return response.data
    }
)

export const addEvent = createAsyncThunk(
    'event/addEvent',
    async (newEvent) => {
        const response = await axios.post("https://387a8059-3923-4337-9a50-21157b544a01-00-1sgspvqiuj4tj.spock.replit.dev/events",
            newEvent
        )
        return response.data
    }
)

export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async ({id, updatedData}) => {
        const response = await axios.post(`https://387a8059-3923-4337-9a50-21157b544a01-00-1sgspvqiuj4tj.spock.replit.dev/events/${id}`,
            updatedData
        )
        return response.data
    }
)

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (id) => {
        const response = await axios.delete(`https://387a8059-3923-4337-9a50-21157b544a01-00-1sgspvqiuj4tj.spock.replit.dev/events/${id}`)
        return response.data
    }
)

const initialState = {
    events: [],
    status: 'idle',
    error: null
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchEvents.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchEvents.fulfilled]: (state, action) => {
            state.status = 'success'
            state.events = action.payload
        },
        [fetchEvents.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
        [addEvent.pending]: (state) => {
            state.status = 'loading'
        },
        [addEvent.fulfilled]: (state, action) => {
            state.status = "success"
            state.events.push(action.payload)
        },
        [addEvent.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
        [updateEvent.pending]: (state) => {
            state.status = 'loading'
        },
        [updateEvent.fulfilled]: (state,action) => {
            state.status = 'success'
            const updatedEvent = action.payload
            const index = state.events.findIndex((v) => v._id === updatedEvent._id )
            if(index !== -1) {
                state.events[index] = updatedEvent
            }
        },
        [updateEvent.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
        [deleteEvent.pending]: (state) => {
            state.status = 'loading'
        },
        [deleteEvent.fulfilled]: (state, action) => {
            state.status = 'success'
            state.events = state.events.filter((v) => v._id !== action.payload._id)
        },
        [deleteEvent.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
    }
})