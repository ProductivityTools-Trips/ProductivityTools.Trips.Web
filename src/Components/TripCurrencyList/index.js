import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../services/apiService";

import Button from '@mui/material/Button';
import { setRef } from "@mui/material";



function TripCurrency() {

    let params = useParams();
    const navigate = useNavigate();

    const [tripCurrency, setTripCurrency] = useState([]);
    const [refreshPointer, setRefreshPointer] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTripCurrency(params.id);
            setTripCurrency(r);
        }
        fetchData();
    }, [refreshPointer])


    const addCurrency = () => {
        console.log("add currency")
        navigate('/tripcurrency?tripId=' + params.id, { replace: true })
    }

    const deleteCurrency = async (tripCurrencyId) => {
        const r = await service.deleteTripCurrency(tripCurrencyId)
        setRefreshPointer(refreshPointer + 1)
    }

    return (
        <div>
            <p>Trip currencies:</p>
            <table>
                <tr>
                    <th>TripCurrencyId</th>
                    <th>Currency Name</th>
                    <th>Conversion rate</th>
                </tr>
                {tripCurrency.map(x => {
                    return (
                        <tr>
                            <td>{x.tripCurrencyId}</td>
                            <td>{x.currencyName}</td>
                            <td>{x.value}</td>
                            <td><button onClick={()=>deleteCurrency(x.tripCurrencyId)}>Delete</button></td>
                        </tr>
                    )
                })}
            </table>
            <Button onClick={addCurrency} variant="contained">Add currency</Button>
        </div>

    )
}

export default TripCurrency;