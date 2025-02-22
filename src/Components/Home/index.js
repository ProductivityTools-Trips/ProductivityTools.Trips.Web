import { useEffect, useState } from 'react'
import TripList from '../TripList'
import service from '../../services/apiService'
import { useNavigate } from 'react-router-dom';


function Home() {
    const [date, setDate] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const dt = await service.getDate();
            setDate(dt);
        }
        fetchData();
    }, [])

    const login = () => {
        navigate("/Login")
    }

    return (
        <div>
            <p>{date}</p>
            Hello
            <button onClick={login}>Login</button>
            <div>
                <TripList />
            </div>
        </div>
    )
}

export default Home;