import { useState } from "react";
import service from "../../services/apiService";
import {useNavigate} from 'react-router-dom'

function TripAdd(){

    const [trip, setTrip]=useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setTrip(prevState => ({
            ...prevState, [name]: value
        }))
    }

    
    const addTrip = async () => {
        await service.addTrip(trip);
        navigate('/', { replace: true })
    }


    return(
        <div>
             <p><span>Trip Name: </span><input type='edit' name='name' value={trip && trip.name || ""} onChange={handleChange}></input></p>
             <input type="button" value="Add" onClick={addTrip}></input>
        </div>
    )
}

export default TripAdd;