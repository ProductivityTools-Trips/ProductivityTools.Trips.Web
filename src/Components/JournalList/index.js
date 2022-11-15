import { useEffect, useState } from "react";
import service from "../../services/apiService";
import { useParams,Link } from 'react-router-dom'
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
            <tbody>
                {journals.map(x => {
                    return (
                        <tr key={x.journalId}>
                            <td>{moment(x.date).format('YYYY.MM.DD')}</td>
                            <td><span className="wrap">{x.notes}</span></td>
                            <td>
                                <Link to={"/JournalEdit/?tripId=" + params.id} > Edit</Link>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default JournalList;