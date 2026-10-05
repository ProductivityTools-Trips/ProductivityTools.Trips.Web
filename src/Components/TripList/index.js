import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import service from '../../services/apiService'
import { SortHeader, useSort } from '../Shared/Table'
import { EXPENSED_SCALE, barColor, fmtMoney, fmtDate, sortBy } from '../../utils/format'
import { DEFAULT_TRIP_TYPE, TRIP_CATEGORIES, TRIP_TYPES } from '../../utils/tripTypes'

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
    const [type, setType] = useState('all')           // 'all' | <trip type>
    const [category, setCategory] = useState('all')   // 'all' | 'none' | <category>
    const [sort, toggleSort] = useSort('start', 'desc', ['name', 'tripCategory'])

    useEffect(() => {
        service.getTripsFullView().then(setTrips)
    }, [])

    // Search + type + category filter (shared by the table and the summary).
    const filtered = useMemo(() => {
        if (!trips) return null
        const q = query.trim().toLowerCase()
        return trips.filter(t =>
            (!q || t.name?.toLowerCase().includes(q)) &&
            (type === 'all' || (t.tripType ?? DEFAULT_TRIP_TYPE) === type) &&
            (category === 'all' || (category === 'none' ? !t.tripCategory : t.tripCategory === category)))
    }, [trips, query, type, category])

    const visible = useMemo(() => filtered && sortBy(filtered, sort.key, sort.dir), [filtered, sort])

    /** Row click: plain click navigates in place; middle / ctrl / cmd / shift click opens a new tab. */
    const openTrip = (e, tripId) => {
        const url = `/tripdetail/${tripId}`
        if (e.button === 1 || e.ctrlKey || e.metaKey || e.shiftKey) {
            e.preventDefault()
            window.open(url, '_blank', 'noopener')
        } else {
            navigate(url)
        }
    }

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

    const categoryOptions = useMemo(() => [
        { key: 'all', label: 'All' },
        ...TRIP_CATEGORIES.map(c => ({ key: c, label: c })),
        { key: 'none', label: 'No category' },
    ], [])


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
                    <Link className="btn btn--ghost" to="/reports/">Reports</Link>
                    <Link className="btn btn--primary" to="addtrip/">＋ Add trip</Link>
                </div>
            </header>

            <div className="filterbar filterbar--stack">
                <div className="filterbar__row">
                    <span className="filterbar__label">Type</span>
                    <div className="choices">
                        {[{ key: 'all', label: 'All' }, ...TRIP_TYPES.map(t => ({ key: t, label: t }))].map(o => (
                            <button key={o.key} type="button"
                                className={`choice choice--sm ${type === o.key ? 'is-selected' : ''}`}
                                onClick={() => setType(o.key)}>
                                {o.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="filterbar__row">
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
                </div>
                {(type !== 'all' || category !== 'all') && (
                    <button type="button" className="link-btn" onClick={() => { setType('all'); setCategory('all') }}>Clear filters</button>
                )}
            </div>

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
                                <tr key={x.tripId} className="is-link"
                                    onClick={(e) => openTrip(e, x.tripId)}
                                    onAuxClick={(e) => e.button === 1 && openTrip(e, x.tripId)}>
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