
import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { CacheContext } from '../../session/CacheContext';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import Button from '@mui/material/Button';
import service from '../../services/apiService';



function TripCurrency() {


    const [searchParams, setSearchParams] = useSearchParams();
    const navigate=useNavigate();
    const id = parseInt(searchParams.get("tripId"));
    console.log(id);
    const cache = useContext(CacheContext)

    const [tripCurrency, setTripCurrency] = useState({ tripId: id })


    const handleChange = (newValue) => {
        console.log(newValue.target.value);
        setTripCurrency(prevState => ({
            ...prevState, value: newValue.target.value
        }))
    }

    const currencyChange = (newValue) => {
        console.log(newValue.target.value);
        setTripCurrency(prevState => ({
            ...prevState, currencyId: newValue.target.value
        }))
    }

    const save = () => {
        service.saveTripCurrency(tripCurrency);
        navigate('/tripedit/'+id, { replace: true })

    }

    return (
        <div>
            TripCurrency
            <RadioGroup
                onChange={currencyChange}>
                {cache && cache.currencies && cache.currencies.map(x => {
                    return (
                        <FormControlLabel value={x.currencyId} control={<Radio />} label={x.name}></FormControlLabel>
                    )
                })}
            </RadioGroup>
            <p><TextField label="Value" type="number" onChange={handleChange} value={tripCurrency.value || 0}></TextField> 
            </p>
            <Button onClick={save} variant="contained">Save</Button>
        </div >
    )
}

export default TripCurrency