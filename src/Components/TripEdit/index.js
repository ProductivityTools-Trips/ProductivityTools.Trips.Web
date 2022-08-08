
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
import Button from '@mui/material/Button';




moment.locale('en', { week: { dow: 1 } })

function TripEdit(props) {
    let params = useParams();

    const [trip, setTrip] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (props.mode == 'add') {
            setTrip({ start: moment().format('yyyy-MM-DD'), end: moment().format('yyyy-MM-DD') })
        }
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
            <Link to={"/"}>Trip List</Link>
            <p>{props.mode == 'edit' ? <span>Mode: Edit</span> : <span>Mode: Add</span>}</p>
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
            <div><TextField label="Days" type="number" name="days" onChange={handleChange} value={trip && trip.days || 0}></TextField></div>
            <div><TextField label="Nights" type="number" name="nights" onChange={handleChange} value={trip && trip.nights || 0}></TextField></div>
            <div><TextField label="Description" type="text" multiline fullWidth name="description" onChange={handleChange} value={trip && trip.description || ''}></TextField></div>
            <div><TextField label="Learnings" type="text" multiline fullWidth name="learnings" onChange={handleChange} value={trip && trip.learnings || ''}></TextField></div>

            <Button onClick={save} variant="contained">Save</Button>
            
            {props.mode == 'edit' ? <TripCurrency></TripCurrency> : <span></span>}
        </div>

    )
}

export default TripEdit