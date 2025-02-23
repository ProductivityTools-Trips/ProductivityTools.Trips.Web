import { useEffect, useState } from 'react'
import TripList from '../TripList'
import service from '../../services/apiService'
import { useNavigate } from 'react-router-dom';
import { auth, logout } from "../../session/firebase";



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
            <button onClick={logout}>Logout</button>
            <div>
                <TripList />
            </div>
        </div>
    )
}

export default Home;