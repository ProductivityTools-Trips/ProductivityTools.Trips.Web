import { useEffect, useState } from "react";
import service from "../../services/apiService";
import { useParams } from 'react-router-dom'
import moment from 'moment';


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
        <table>

            {journals.map(x => {
                return (
                    <tr>
                        <td>{moment(x.date).format('YYYY.MM.DD')}</td>
                        <td><span className="wrap">{x.notes}</span></td>
                    </tr>
                )
            })}
        </table>
    )
}

export default JournalList;