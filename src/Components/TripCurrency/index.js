
import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { CacheContext } from '../../session/CacheContext';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';


function TripCurrency() {


    const [searchParams, setSearchParams] = useSearchParams();
    const id = parseInt(searchParams.get("tripId"));
    const cache = useContext(CacheContext)

    const [tripCurrency, setTripCurrency] = useState({ tripId: id })


    const handleChange = (newValue) => {
        setTripCurrency(prevState => ({
            ...prevState, value: newValue
        }))
    }

    const currencyChange = (newValue) => {
        console.log(newValue.target.value);
        setTripCurrency(prevState => ({
            ...prevState, currencyId: newValue.target.value
        }))
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
            <p><TextField label="Value" type="number" onChange={handleChange} value={tripCurrency.value || 0}></TextField></p>

        </div >
    )
}

export default TripCurrency