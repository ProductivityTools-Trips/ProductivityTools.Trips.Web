import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/apiService";

function TripCurrency() {

    let params = useParams();
    const [tripCurrency, setTripCurrency] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getTripCurrency(params.id);
            setTripCurrency(r);
        }
        fetchData();
    }, [])


    return (
        <div>
            <p>TrupCurrency</p>
            <table>
                {tripCurrency.map(x=>{
                    return (
                        <tr>
                            <td>{x.currencyName}</td>
                            <td>{x.value}</td>
                        </tr>
                    )
                })}
            </table>
        </div>

    )
}

export default TripCurrency;