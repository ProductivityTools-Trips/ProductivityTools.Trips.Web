import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import service from '../../services/apiService'
import { fmtDate } from '../../utils/format'

function JournalList() {
    const { id } = useParams()
    const [journals, setJournals] = useState(null)

    useEffect(() => {
        service.getJournalList(id).then(r => setJournals([...r].sort((x, y) => (x.date < y.date ? 1 : -1))))
    }, [id])

    return (
        <div className="section">
            <div className="section__head">
                <h2 className="section__title">Journal</h2>
                <span className="section__meta">{journals?.length ?? 0} entries</span>
            </div>

            <div className="card">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th style={{ width: 160 }}>Date</th>
                            <th>Notes</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {journals?.map(x => (
                            <tr key={x.journalId}>
                                <td className="tbl__nowrap tbl__strong" style={{ verticalAlign: 'top' }}>{fmtDate(x.date)}</td>
                                <td className="tbl__wrap">{x.notes}</td>
                                <td className="tbl__num" style={{ verticalAlign: 'top' }}>
                                    <Link className="tbl__link" to={`/JournalEdit/?tripId=${id}&journalId=${x.journalId}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                        {journals && journals.length === 0 && (
                            <tr><td colSpan={3} className="tbl__empty">No notes yet</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default JournalList