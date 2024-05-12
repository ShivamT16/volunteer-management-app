import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteEvent, fetchEvents } from "./eventSlice"
import { Link } from "react-router-dom"

export const EventView = () => {
    const dispatch = useDispatch()
    const events = useSelector((state) => state.events.events )
    const status = useSelector((state) => state.events.status)
    const error = useSelector((state) => state.events.error )

    useEffect(() => {
      if(status === 'idle') {
        dispatch(fetchEvents())
     }
    }, [dispatch, status] )

    return(
        <div>
            <h2>Event View</h2>
            <Link to="/events/add">Add New Event</Link>
            {events.map((item) => 
            <div key={item._id}>
                {item.eventName} || {item.location} || {item.description} || {item.requirement} Volunteer
                <button onClick={() => dispatch(deleteEvent(item._id)) } >Delete </button>
                <Link to={`/events/update/${item._id}`} ><button>Edit</button></Link>
            </div>
            )}
        </div>
    )
}