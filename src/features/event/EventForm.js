import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addEvent, updateEvent } from "./eventSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./inputForm.css"

export const EventForm = ()=> {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)
    const event = events.find((e) => e._id === id )

    const [newEvent, setNewEvent] = useState({
        eventName: event ? event.eventName : "",
        date: event ? event.date : "",
        description: event ? event.description : "",
        location: event ? event.location : "",
        volunteerRole: event ? event.volunteerRole : "",
        requirement: event ? event.requirement : ""
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewEvent({...newEvent, [name]: value })
    }

    const handleSubmit = (e) => {
        if( !newEvent.eventName || !newEvent.date || !newEvent.description || !newEvent.location || !newEvent.requirement ) {
           toast.warn("All fields are required")
        }
        else {
            event ?
            dispatch(updateEvent({id: event._id, updatedData: newEvent})) :
            dispatch(addEvent(newEvent))
            navigate("/events")
        }
    }

    return(
        <div className="input-Main">
            <h2>Add New Event</h2>         
            <input className="input" type="text" name="eventName" value={newEvent.eventName} onChange={handleChange} autoComplete="off" placeholder="Event Name" required/>
            <input className="input" type="date" name="date" value={newEvent.date} onChange={handleChange} autoComplete="off"  />
            <input className="input" type="text" name="description" value={newEvent.description} onChange={handleChange} autoComplete="off" placeholder="Description"  />
            <input className="input" type="text" name="location" value={newEvent.location} onChange={handleChange} autoComplete="off" placeholder="Location" />
            <input className="input" type="text" name="volunteerRole" value={newEvent.volunteerRole} onChange={handleChange} autoComplete="off" placeholder="Volunteer's Role" /> 
            <input className="input" type="Number" name="requirement" value={newEvent.requirement} onChange={handleChange} autoComplete="off" placeholder="Volunteer Required" /> 
            <button className="submit-btn" onClick={handleSubmit}>{event ? "Update Event" : "Add New Event"}</button>
            <ToastContainer autoClose={2000} />
        </div>
    )
}