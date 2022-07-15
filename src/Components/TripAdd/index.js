import { useState } from "react";
import service from "../../services/apiService";
import { useNavigate } from 'react-router-dom'

import moment from 'moment';


import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function TripAdd() {

    const [trip, setTrip] = useState({ start: moment().format('yyyy-MM-DD'), end: moment().format('yyyy-MM-DD') });
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


    return (
        <div>
            <p><span>Trip Name: </span><input type='edit' name='name' value={trip && trip.name || ""} onChange={handleChange}></input></p>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    label="From"
                    value={trip.startDate}
                    onChange={(newValue) => {
                        console.log(newValue.format());
                        setTrip(prevState => ({
                            ...prevState, start: newValue.format('yyyy-MM-DD')
                        }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label="To"
                    value={trip.endDate}
                    onChange={(newValue) => {
                        console.log(newValue.format());
                        setTrip(prevState => ({
                            ...prevState, end: newValue.format('yyyy-MM-DD')
                        }));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <input type="button" value="Add" onClick={addTrip}></input>
        </div>
    )
}

export default TripAdd;