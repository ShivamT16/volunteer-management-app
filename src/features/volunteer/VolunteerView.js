import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteVolunteer, fetchVolunteers } from "./volunteerSlice"
import { Link } from "react-router-dom"

export const VolunteerView = () => {
    const dispatch = useDispatch()
    const volunteers = useSelector((state) => state.volunteers.volunteers)
    const status = useSelector((state) => state.volunteers.status )
    const error = useSelector((state) => state.volunteers.error )

    useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchVolunteers())
    }
    }, [dispatch, status])

    return(
        <div className="event-Main">
            <h2> Volunteer View </h2>

            {status === 'loading' && <h3>Loading...</h3> }
            {status === 'error' && <h3> {error} </h3> }
            
            <Link className="add-btn" to="/volunteers/add" ><h3>Add New Volunteer</h3></Link>

            {
            volunteers.map((item) => 
            <div className="event-List" key={item._id} >
             <Link className="Link" to={`/volunteerDetail/${item._id}`} >
             Name - {item.volunteerName} || Skills - {item.skills} || Event - {item.eventAssigned.join(" | ")}
             </Link>
             <Link><button className="button" onClick={() => dispatch(deleteVolunteer(item._id)) } >Delete</button></Link>
             <Link to={`/volunteers/update/${item._id}`} ><button className="button" >Edit</button></Link>
            </div>
            )
        }
        </div>
    )
}