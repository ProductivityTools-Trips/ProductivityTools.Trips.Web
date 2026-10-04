import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import service from '../../services/apiService'
import { SortHeader, useSort } from '../Shared/Table'
import { EXPENSED_SCALE, barColor, fmtMoney, fmtDate, sortBy } from '../../utils/format'
import { TRIP_CATEGORIES } from '../../utils/tripTypes'

const COLUMNS = [
    { key: 'name', label: 'Name' },
    { key: 'start', label: 'Date' },
    { key: 'tripCategory', label: 'Category', className: 'hide-sm' },
    { key: 'days', label: 'Duration', className: 'hide-sm' },
    { key: 'cost', label: 'Cost', numeric: true },
    { key: 'expensed', label: 'Expensed', numeric: true },
]

const SummaryLine = ({ label, s }) => (
    <span className="summary__item">
        <span className="summary__label">{label}</span>
        {s.count} trips · {s.days} days · {fmtMoney(s.cost)} PLN
        {s.expensed !== s.cost && <span className="tbl__muted"> (expensed {fmtMoney(s.expensed)})</span>}
    </span>
)

function TripList() {
    const navigate = useNavigate()
    const [trips, setTrips] = useState(null)
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('all')   // 'all' | 'none' | <category>
    const [sort, toggleSort] = useSort('start', 'desc', ['name', 'tripCategory'])

    useEffect(() => {
        service.getTripsFullView().then(setTrips)
    }, [])

    // Search + category filter (shared by the table and the summary).
    const filtered = useMemo(() => {
        if (!trips) return null
        const q = query.trim().toLowerCase()
        return trips.filter(t =>
            (!q || t.name?.toLowerCase().includes(q)) &&
            (category === 'all' || (category === 'none' ? !t.tripCategory : t.tripCategory === category)))
    }, [trips, query, category])

    const visible = useMemo(() => filtered && sortBy(filtered, sort.key, sort.dir), [filtered, sort])

    // Summary split into Private (Family + Friends) and Company trips – follows the active filter.
    const summary = useMemo(() => {
        const sum = (rows) => ({
            count: rows.length,
            days: rows.reduce((s, t) => s + (t.days || 0), 0),
            cost: rows.reduce((s, t) => s + (t.cost || 0), 0),
            expensed: rows.reduce((s, t) => s + (t.expensed || 0), 0),
        })
        const all = filtered ?? []
        const company = all.filter(t => t.tripType === 'Company')
        const privateTrips = all.filter(t => t.tripType !== 'Company')
        return { all: sum(all), private: sum(privateTrips), company: sum(company) }
    }, [filtered])

    // Only offer categories that actually occur (plus "No category" when relevant).
    const categoryOptions = useMemo(() => {
        const used = new Set((trips ?? []).map(t => t.tripCategory).filter(Boolean))
        const opts = [{ key: 'all', label: 'All' }]
        TRIP_CATEGORIES.filter(c => used.has(c)).forEach(c => opts.push({ key: c, label: c }))
        if ((trips ?? []).some(t => !t.tripCategory)) opts.push({ key: 'none', label: 'No category' })
        return opts
    }, [trips])


    return (
        <section className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Trips</h1>
                    <div className="page__subtitle summary">
                        <SummaryLine label="Private" s={summary.private} />
                        <SummaryLine label="Company" s={summary.company} />
                        <SummaryLine label="All" s={summary.all} />
                    </div>
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

            {categoryOptions.length > 2 && (
                <div className="filterbar">
                    <span className="filterbar__label">Category</span>
                    <div className="choices">
                        {categoryOptions.map(o => (
                            <button key={o.key} type="button"
                                className={`choice choice--sm ${category === o.key ? 'is-selected' : ''}`}
                                onClick={() => setCategory(o.key)}>
                                {o.label}
                            </button>
                        ))}
                    </div>
                    {category !== 'all' && (
                        <button type="button" className="link-btn" onClick={() => setCategory('all')}>Clear filter</button>
                    )}
                </div>
            )}

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
                                        {x.tripCategory ? <span className="pill">{x.tripCategory}</span> : <span className="tbl__muted">—</span>}
                                    </td>
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