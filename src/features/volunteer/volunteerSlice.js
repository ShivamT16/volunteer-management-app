import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchVolunteers = createAsyncThunk(
    'volunteer/fetchVolunteers',
    async () => {
        const response = await axios.get("https://volunteer-management-app-six.vercel.app/volunteers",)
        return response.data
    }
)

export const addVolunteer = createAsyncThunk(
    'volunteer/addVolunteer',
    async (newVolunteer) => {
        const response = await axios.post("https://volunteer-management-app-six.vercel.app/volunteers",
            newVolunteer
        )
        return response.data
    }
)

export const updateVolunteer = createAsyncThunk(
    'volunteer/updateVolunteer',
    async ({id, updatedData}) => {
        const response = await axios.post(`https://volunteer-management-app-six.vercel.app/volunteers/${id}`,
            updatedData
        )
        return response.data
    }
)

export const deleteVolunteer = createAsyncThunk(
    'volunteer/deleteVolunteer',
    async (id) => {
        const response = await axios.delete(`https://volunteer-management-app-six.vercel.app/volunteers/${id}`)
        return response.data
    }
)

const initialState = {
    volunteers: [],
    status: "idle",
    error: null
}

export const volunteerSlice = createSlice({
    name: "volunteer",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchVolunteers.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchVolunteers.fulfilled]: (state, action) => {
            state.status = 'success'
            state.volunteers = action.payload
        },
        [fetchVolunteers.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
        [addVolunteer.pending]: (state) => {
            state.status = 'loading'
        },
        [addVolunteer.fulfilled]: (state, action) => {
            state.status = "success"
            state.volunteers.push(action.payload)
        },
        [addVolunteer.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
        [updateVolunteer.pending]: (state) => {
            state.status = 'loading'
        },
        [updateVolunteer.fulfilled]: (state,action) => {
            state.status = 'success'
            const updatedVolunteer = action.payload
            const index = state.volunteers.findIndex((v) => v._id === updatedVolunteer._id )
            if(index !== -1) {
                state.volunteers[index] = updatedVolunteer
            }
        },
        [updateVolunteer.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
        [deleteVolunteer.pending]: (state) => {
            state.status = 'loading'
        },
        [deleteVolunteer.fulfilled]: (state, action) => {
            state.status = 'success'
            state.volunteers = state.volunteers.filter((v) => v._id !== action.payload._id)
        },
        [deleteVolunteer.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        },
    }
})