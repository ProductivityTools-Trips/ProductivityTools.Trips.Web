import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import service from '../../services/apiService'
import { SortHeader, useSort } from '../Shared/Table'
import { EXPENSED_SCALE, barColor, fmtMoney, fmtDate, sortBy } from '../../utils/format'

const COLUMNS = [
    { key: 'name', label: 'Name' },
    { key: 'start', label: 'Date' },
    { key: 'days', label: 'Duration', className: 'hide-sm' },
    { key: 'cost', label: 'Cost', numeric: true },
    { key: 'expensed', label: 'Expensed', numeric: true },
]

function TripList() {
    const navigate = useNavigate()
    const [trips, setTrips] = useState(null)
    const [query, setQuery] = useState('')
    const [sort, toggleSort] = useSort('start')

    useEffect(() => {
        service.getTripsFullView().then(setTrips)
    }, [])

    const visible = useMemo(() => {
        if (!trips) return null
        const q = query.trim().toLowerCase()
        const filtered = q ? trips.filter(t => t.name?.toLowerCase().includes(q)) : trips
        return sortBy(filtered, sort.key, sort.dir)
    }, [trips, query, sort])

    const totals = useMemo(() => ({
        count: trips?.length ?? 0,
        days: trips?.reduce((s, t) => s + (t.days || 0), 0) ?? 0,
        cost: trips?.reduce((s, t) => s + (t.cost || 0), 0) ?? 0,
    }), [trips])

    return (
        <section className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Trips</h1>
                    <p className="page__subtitle">
                        {totals.count} trips · {totals.days} days · {fmtMoney(totals.cost)} PLN
                    </p>
                </div>
                <div className="page__actions">
                    <input
                        className="input input--search"
                        placeholder="Search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Link className="btn btn--primary" to="addtrip/">＋ Add trip</Link>
                </div>
            </header>

            <div className="card">
                <table className="tbl">
                    <thead>
                        <tr>
                            {COLUMNS.map(c => <SortHeader key={c.key} col={c} sort={sort} onSort={toggleSort} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {visible?.map(x => {
                            const ratio = Math.min(100, Math.max(0, (x.expensed || 0) / EXPENSED_SCALE * 100))
                            return (
                                <tr key={x.tripId} className="is-link" onClick={() => navigate(`tripdetail/${x.tripId}`)}>
                                    <td className="tbl__strong">
                                        <Link to={`tripdetail/${x.tripId}`} onClick={e => e.stopPropagation()}>{x.name}</Link>
                                        {x.tripType && <span className="pill" style={{ marginLeft: 8 }}>{x.tripType}</span>}
                                    </td>
                                    <td className="tbl__nowrap">{fmtDate(x.start)}</td>
                                    <td className="hide-sm">
                                        <span className="pill">{x.days ?? '—'} d · {x.nights ?? '—'} n</span>
                                    </td>
                                    <td className="tbl__num">{fmtMoney(x.cost)} PLN</td>
                                    <td className="tbl__num">
                                        {fmtMoney(x.expensed)}
                                        <div className="progress" title={`${fmtMoney(x.expensed)} / ${fmtMoney(EXPENSED_SCALE)} PLN`}>
                                            <span style={{ width: `${ratio}%`, backgroundColor: barColor(ratio / 100) }} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {visible && visible.length === 0 && (
                            <tr><td colSpan={COLUMNS.length} className="tbl__empty">No trips found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default TripList