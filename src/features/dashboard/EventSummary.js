import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "../event/eventSlice"
import { fetchVolunteers } from "../volunteer/volunteerSlice"
import { Link } from "react-router-dom"

export const EventSummary = () => {
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)
    const status = useSelector((state) => state.events.status)
    const error = useSelector((state) => state.events.error)
    const volunteers = useSelector((state) => state.volunteers.volunteers )

    useEffect(() => {
        if(status === 'idle')
        {  dispatch(fetchEvents());
           dispatch(fetchVolunteers())  }
    }, [dispatch, status] )

    return (
        <div>
            <h2>Event Summary</h2>
            {status === 'loading' && <h2>Loading...</h2> }
            {status === 'error' && <h2>{error}</h2> }

            {events.map((item) => 
            <div key={item._id}>
                <Link to={`/event/${item.eventName}`} > {item.eventName} || {item.description} || {item.location} </Link>
            </div>
            )}

        </div>
    )
}