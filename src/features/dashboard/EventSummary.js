import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "../event/eventSlice"
import { fetchVolunteers } from "../volunteer/volunteerSlice"
import { Link } from "react-router-dom"
import "./eventSummary.css"

export const EventSummary = () => {
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events)
    const status = useSelector((state) => state.events.status)
    const error = useSelector((state) => state.events.error)
    const date = new Date()
    const todayDate = date.getFullYear() + "-" + "0"+(date.getMonth()+1) + "-" + date.getDate()
    
    useEffect(() => {
        if(status === 'idle')
        {  dispatch(fetchEvents());
           dispatch(fetchVolunteers())  }
    }, [dispatch, status] )

    return (
        <div className="event-Main">
            <h1>Events</h1>

            {status === 'loading' && <h2>Loading...</h2> }
            {status === 'error' && <h2>{error}</h2> }

            {events.map((item) => 
            <div className="event-List" key={item._id}>
                <Link className="Link" to={`/event/${item.eventName}`} > 
                {item.eventName} - {item.description} on <span style={{color: "blue"}} >"{item.date.split("-").reverse().join("-")}"</span> 
                <span style={{color:"red", paddingLeft: "2%", fontSize: "1rem"}} > {item.date < todayDate ? "Event expired" : "" } </span>
                </Link>
            </div>
            )}
        </div>
    )
}