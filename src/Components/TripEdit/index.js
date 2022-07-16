
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import service from '../../services/apiService'
import { Link } from 'react-router-dom'
import TripCurrency from "../TripCurrency";



function TripEdit() {
    let params = useParams();

    const [trip, setTrip] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTrip(params.id);
            setTrip(r);
        }
        fetchData();
    }, [])


    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setTrip(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const save = () => {
        service.saveTrip(trip);
    }

    return (
        <div>
            <Link to={"/"}>triplist</Link>
          
            <p>TripEdit</p>
            <p>{params.id}</p>
            <p><input type='edit' name='name' value={trip && trip.name || ""} onChange={handleChange}></input> </p>
            <TripCurrency></TripCurrency>
            <button onClick={save}>Save</button>
        </div>

    )
}

export default TripEdit