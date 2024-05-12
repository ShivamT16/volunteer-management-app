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
        <div>
            <h2> Volunteer View </h2>

            {status === 'loading' && <h3>Loading...</h3> }
            {status === 'error' && <h3> {error} </h3> }
            <Link to="/volunteers/add" >Add New Volunteer</Link>
            {
            volunteers.map((item) => 
            <div key={item._id} >
             <Link to={`/volunteerDetail/${item._id}`} >
             {item.volunteerName} || 
             {item.availability ? "true" : "false"} ||
             {item.skills} ||
             {item.eventAssigned.join(" | ")}
             </Link>
             <button onClick={() => dispatch(deleteVolunteer(item._id)) } >Delete</button>
             <Link to={`/volunteers/update/${item._id}`} ><button>Edit</button></Link>
            </div>
            )
        }
        </div>
        
    )
}