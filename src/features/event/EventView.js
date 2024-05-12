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
        <div className="event-Main">
            <h2>Event View</h2>

            {status === 'loading' && <h3>Loading...</h3> }
            {status === 'error' && <h3> {error} </h3> }
            
            <Link className="add-btn" to="/events/add"><h3>Add New Event</h3></Link>

            {events.map((item) => 
            <div className="event-List" key={item._id}>
                <Link className="Link" to={`/event/${item.eventName}`} >
                {item.eventName} - {item.description} || {item.requirement} Volunteer Required
                </Link>
                <button className="button" onClick={() => dispatch(deleteEvent(item._id)) } >Delete </button>
                <Link to={`/events/update/${item._id}`} ><button className="button" >Edit</button></Link>
            </div>
            )}
        </div>
    )
}