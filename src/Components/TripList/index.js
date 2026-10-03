import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import service from '../../services/apiService'
import './TripList.css'

const COLUMNS = [
    { key: 'name', label: 'Name' },
    { key: 'start', label: 'Dates' },
    { key: 'days', label: 'Duration', className: 'hide-sm' },
    { key: 'cost', label: 'Cost', numeric: true },
    { key: 'expensed', label: 'Expensed', numeric: true },
]

/** Expensed bar reaches full width / dark red at this amount (PLN). */
const EXPENSED_SCALE = 30000

/** 0 → vivid green, 1 → deep red; values in between blend smoothly. */
const barColor = (t) => {
    const hue = 140 - 140 * t        // 140° green → 0° red
    const light = 42 - 6 * t         // slightly darker towards red
    return `hsl(${hue}, 70%, ${light}%)`
}

const fmtMoney = (v) => v == null ? '—' : v.toLocaleString('pl-PL', { maximumFractionDigits: 0 })

const fmtRange = (start, end) => {
    const s = moment(start), e = moment(end)
    if (s.isSame(e, 'day')) return e.format('D MMM YYYY')
    const sameYear = s.year() === e.year()
    const sameMonth = sameYear && s.month() === e.month()
    const left = sameMonth ? s.format('D') : sameYear ? s.format('D MMM') : s.format('D MMM YYYY')
    return `${left} – ${e.format('D MMM YYYY')}`
}

function TripList() {
    const navigate = useNavigate()
    const [trips, setTrips] = useState(null)
    const [query, setQuery] = useState('')
    const [sort, setSort] = useState({ key: 'start', dir: 'desc' })

    useEffect(() => {
        service.getTripsFullView().then(setTrips)
    }, [])

    const toggleSort = (key) =>
        setSort(prev => prev.key === key
            ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
            : { key, dir: key === 'name' ? 'asc' : 'desc' })

    const visible = useMemo(() => {
        if (!trips) return null
        const q = query.trim().toLowerCase()
        const filtered = q ? trips.filter(t => t.name?.toLowerCase().includes(q)) : trips
        const sign = sort.dir === 'asc' ? 1 : -1
        return [...filtered].sort((a, b) => {
            const x = a[sort.key] ?? '', y = b[sort.key] ?? ''
            return x > y ? sign : x < y ? -sign : 0
        })
    }, [trips, query, sort])

    const totals = useMemo(() => ({
        count: trips?.length ?? 0,
        days: trips?.reduce((s, t) => s + (t.days || 0), 0) ?? 0,
        cost: trips?.reduce((s, t) => s + (t.cost || 0), 0) ?? 0,
    }), [trips])

    return (
        <section className="trips">
            <header className="trips__header">
                <div>
                    <h1 className="trips__title">Trips</h1>
                    <p className="trips__summary">
                        {totals.count} trips · {totals.days} days · {fmtMoney(totals.cost)} PLN
                    </p>
                </div>
                <div className="trips__actions">
                    <input
                        className="trips__search"
                        placeholder="Search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Link className="trips__add" to="addtrip/">＋ Add trip</Link>
                </div>
            </header>

            <div className="trips__card">
                <table className="trips__table">
                    <thead>
                        <tr>
                            {COLUMNS.map(c => (
                                <th key={c.key} className={`${c.className ?? ''} ${c.numeric ? 'trips__num' : ''}`}>
                                    <button
                                        className={`trips__sort ${sort.key === c.key ? 'is-active' : ''}`}
                                        onClick={() => toggleSort(c.key)}
                                    >
                                        {c.label}
                                        <span className="trips__sort-icon">
                                            {sort.key === c.key ? (sort.dir === 'asc' ? '▲' : '▼') : '⇅'}
                                        </span>
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {visible?.map(x => {
                            const ratio = Math.min(100, Math.max(0, (x.expensed || 0) / EXPENSED_SCALE * 100))
                            return (
                                <tr key={x.tripId} onClick={() => navigate(`tripdetail/${x.tripId}`)}>
                                    <td className="trips__name">
                                        <Link to={`tripdetail/${x.tripId}`} onClick={e => e.stopPropagation()}>{x.name}</Link>
                                    </td>
                                    <td className="trips__dates">{fmtRange(x.start, x.end)}</td>
                                    <td className="hide-sm">
                                        <span className="trips__pill">{x.days ?? '—'} d · {x.nights ?? '—'} n</span>
                                    </td>
                                    <td className="trips__num">{fmtMoney(x.cost)} PLN</td>
                                    <td className="trips__num">
                                        {fmtMoney(x.expensed)}
                                        <div className="trips__progress" title={`${fmtMoney(x.expensed)} / ${fmtMoney(EXPENSED_SCALE)} PLN`}>
                                            <span style={{
                                                width: `${ratio}%`,
                                                backgroundColor: barColor(ratio / 100),
                                            }} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        {visible && visible.length === 0 && (
                            <tr><td colSpan={COLUMNS.length} className="trips__empty">No trips found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default TripList