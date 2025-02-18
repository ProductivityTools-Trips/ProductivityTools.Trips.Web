import React, { useContext, useEffect, useState } from 'react'
import service from '../../services/apiService'
import { useParams, Link } from "react-router-dom";
import TextField from '@mui/material/TextField';



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

  return (
    <div>
      <div><p><b>{trip && trip.name || ""}</b></p></div>
      <div><TextField label="Trip description" margin="dense" fullWidth type="text" disabled multiline name="description" value={trip && trip.description || ''}></TextField></div>
      <div><TextField label="Trip learnings" margin="dense" fullWidth type="text" disabled multiline name="learnings" value={trip && trip.learnings || ''}></TextField></div>
    </div>
  )
}

export default TripDescription;