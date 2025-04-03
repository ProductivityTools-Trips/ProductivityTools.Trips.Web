import { useEffect, useState } from 'react'
import TripList from '../TripList'
import service from '../../services/apiService'
import { useNavigate } from 'react-router-dom';
import { auth, logout } from "../../session/firebase";
import Debug from '../Debug';



function Home() {
    const navigate = useNavigate();



    const login = () => {
        navigate("/Login")
    }


    return (
        <div>
            <Debug></Debug>
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