import React, { useContext, useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams, Link } from "react-router-dom";


function TripDescription() {
    let params = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTrip(params.id);
            setTrip(r);
        }
        fetchData();
    }, [])
  
  return(
    <div>
        <span>trip description:</span>
        <span>{trip && trip.description}</span>
    </div>
  )
}

export default TripDescription;