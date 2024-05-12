import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchEvents = createAsyncThunk(
    'event/fetchEvents',
    async () => {
        const response = await axios.get("https://volunteer-management-app-six.vercel.app/events",)
        return response.data
    }
)

export const addEvent = createAsyncThunk(
    'event/addEvent',
    async (newEvent) => {
        const response = await axios.post("https://volunteer-management-app-six.vercel.app/events",
            newEvent
        )
        return response.data
    }
)

export const updateEvent = createAsyncThunk(
    'event/updateEvent',
    async ({id, updatedData}) => {
        const response = await axios.post(`https://volunteer-management-app-six.vercel.app/events/${id}`,
            updatedData
        )
        return response.data
    }
)

export const deleteEvent = createAsyncThunk(
    'event/deleteEvent',
    async (id) => {
        const response = await axios.delete(`https://volunteer-management-app-six.vercel.app/events/${id}`)
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