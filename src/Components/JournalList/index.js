import { useEffect, useState } from "react";
import service from "../../services/apiService";
import { useParams, Link } from 'react-router-dom'
import moment from 'moment';


function JournalList() {

    let params = useParams();
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const r = await service.getJournalList(params.id);
            r.sort((x, y) => x.date < y.date ? 1 : -1)
            setJournals(r);
        }
        fetchData();
    }, [])


    return (
        <div>

            <div>Journal:</div>
            <table className="green">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {journals.map(x => {
                        return (
                            <tr key={x.journalId}>
                                <td>{moment(x.date).format('YYYY.MM.DD')}</td>
                                <td><span className="wrap">{x.notes}</span></td>
                                <td>
                                    <Link to={"/JournalEdit/?tripId=" + params.id + "&journalId=" + x.journalId} > Edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default JournalList;