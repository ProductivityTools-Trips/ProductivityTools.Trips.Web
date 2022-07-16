import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../services/apiService";



import Button from '@mui/material/Button';



function TripCurrency() {

    let params = useParams();
    const navigate = useNavigate();

    const [tripCurrency, setTripCurrency] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTripCurrency(params.id);
            setTripCurrency(r);
        }
        fetchData();
    }, [])


    const addCurrency = () => {
        console.log("add currency")
        navigate('/tripcurrency?tripid='+params.id, { replace: true })
    }

    return (
        <div>
            <p>Trip currencies:</p>
            <table>
                {tripCurrency.map(x => {
                    return (
                        <tr>
                            <td>{x.currencyName}</td>
                            <td>{x.value}</td>
                        </tr>
                    )
                })}
            </table>
            <Button onClick={addCurrency} variant="contained">Add currency</Button>
        </div>

    )
}

export default TripCurrency;