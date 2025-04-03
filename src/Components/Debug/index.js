import { useState,useEffect } from "react";
import service from '../../services/apiService'

function Debug(){

    const [date, setDate] = useState(null);
    const [serverName, setServerName] = useState(null);
    const [appName, setAppName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dt = await service.getDate();
            setDate(dt);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const dt = await service.getServerName();
            setServerName(dt);
        }
        fetchData();
    }, [])

    
    useEffect(() => {
        const fetchData = async () => {
            const dt = await service.getAppName();
            setAppName(dt);
        }
        fetchData();
    }, [])

    return(
        <div>
            <p>Debug information:</p>
            <p>Date: {date}</p>
            <p>ServerName: {serverName}</p>
            <p>AppName: {appName}</p>
        </div>
    )
}

export default Debug;