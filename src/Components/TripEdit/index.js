
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from '../../services/apiService'
import { Link } from 'react-router-dom'
import TripCurrency from "../TripCurrencyList";

import moment from 'moment';

import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



moment.locale('en', { week: { dow: 1 } })

function TripEdit(props) {
    let params = useParams();

    const [trip, setTrip] = useState(null)
    const navigate = useNavigate();

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

    const save = async () => {
        if (props.mode == 'edit') {
            await service.saveTrip(trip);
        }
        if (props.mode == 'add') {
            await service.addTrip(trip);
            navigate('/', { replace: true })
        }
    }

    const calculateDays = async (s1, e1) => {

        let n = e1.diff(s1, 'days');
        let d = n + 1;

        console.log('dff', d);
        setTrip(prevState => ({
            ...prevState, 'days': d
        }))
        setTrip(prevState => ({
            ...prevState, 'nights': n
        }))
        console.log(trip);
    }

    return (
        <div>
            <Link to={"/"}>triplist</Link>

            <p>{props == 'edit' ? <span>Edit</span> : <span>add</span>}</p>
            <p>{params.id}</p>
            <p><input type='edit' name='name' value={trip && trip.name || ""} onChange={handleChange}></input> </p>
            <p><TextField label="Trip Name" name="name" value={trip && trip.name || ''} onChange={handleChange}></TextField></p>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <p><DatePicker
                    label="From"
                    value={trip && trip.start}
                    inputFormat='yyyy.MM.DD'
                    onChange={(newValue) => {
                        console.log(newValue.format());
                        setTrip(prevState => ({
                            ...prevState, start: newValue.format('yyyy-MM-DD')
                        }));

                        calculateDays(newValue, trip.end);

                    }}
                    renderInput={(params) => <TextField {...params} />}
                /></p>
                <p><DatePicker
                    label="To"
                    value={trip && trip.end}
                    inputFormat='yyyy.MM.DD'
                    onChange={(newValue) => {
                        console.log(newValue.format());
                        setTrip(prevState => ({
                            ...prevState, end: newValue.format('yyyy-MM-DD')
                        }));
                        console.log(trip);
                        calculateDays(trip.start, newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </p>
            </LocalizationProvider>
            <p><TextField label="Days" type="number" name="days" onChange={handleChange} value={trip && trip.days || 0}></TextField></p>
            <p><TextField label="Nights" type="number" name="nights" onChange={handleChange} value={trip && trip.nights || 0}></TextField></p>
            <TripCurrency></TripCurrency>
            <button onClick={save}>Save</button>
        </div>

    )
}

export default TripEdit