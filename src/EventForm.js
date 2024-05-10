import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addEvent, updateEvent } from "./eventSlice"

export const EventForm = ()=> {
    const {id} = useParams()
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)
    const event = events.find((e) => e._id === id )

    const [newEvent, setNewEvent] = useState({
        eventName: event ? event.eventName : "",
        date: event ? event.date : "",
        description: event ? event.description : "",
        location: event ? event.location : "",
        requirement: event ? event.requirement : ""
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewEvent({...newEvent, [name]: value })
    }

    const handleSubmit = (e) => {
        event ?
        dispatch(updateEvent({id: event._id, updatedData: newEvent})) :
        dispatch(addEvent(newEvent))
    }

    return(
        <div>
            <input type="text" name="eventName" value={newEvent.eventName} onChange={handleChange} autoComplete="off" placeholder="Event Name" />
            <input type="date" name="date" value={newEvent.date} onChange={handleChange} autoComplete="off"  />
            <input type="text" name="description" value={newEvent.description} onChange={handleChange} autoComplete="off" placeholder="Description"  />
            <input type="text" name="location" value={newEvent.location} onChange={handleChange} autoComplete="off" placeholder="Location" />
            <input type="Number" name="requirement" value={newEvent.requirement} onChange={handleChange} autoComplete="off" placeholder="Volunteer Required" />
            <button onClick={handleSubmit}>{event ? "Update Event" : "Add New Event"}</button>
        </div>
    )
}