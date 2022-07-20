import { useEffect, useState } from 'react'
import TripList from '../TripList'
import service from '../../services/apiService'


function Home() {
    const [date, setDate] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const dt = await service.getDate();
            setDate(dt);
        }
        fetchData();
    }, [])

    return (
        <div>
            <p>{date}</p>
            Hello1
            <div>
                <TripList />
            </div>
        </div>
    )
}

export default Home;