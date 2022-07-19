import { useEffect, useState } from "react";
import service from "../../services/apiService";
import { useParams } from 'react-router-dom'

function JournalList() {

    let params = useParams();
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getJournal(params.id);
            setJournals(r);
        }
        fetchData();
    }, [])


    return (
        <div>

            {console.log("jornals")}
            {console.log(journals)}
            {journals.map(x => {
                return (
                    <div>{x.notes}</div>
                )
            })}
        </div>
    )
}

export default JournalList;