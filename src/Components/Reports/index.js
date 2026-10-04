import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart } from '@mui/x-charts/BarChart'
import service from '../../services/apiService'
import { fmtMoney } from '../../utils/format'
import { TRIP_CATEGORIES } from '../../utils/tripTypes'

const NONE = 'No category'
/** Fixed colour per trip category so the chart, legend and table always agree. */
const TRIP_CATEGORY_COLORS = {
    Ski: '#5B7FB5',
    CityBreak: '#D98B3C',
    Vacations: '#2F6B4F',
    Festival: '#7E5AA6',
    Spain: '#A33A3A',
    [NONE]: '#B5B5B5',
}
/** Palette for expense categories (assigned by overall size, biggest first). */
const PALETTE = ['#2F6B4F', '#4C9A72', '#B8A531', '#D98B3C', '#A33A3A', '#5B7FB5', '#7E5AA6', '#3C9FA3', '#C9607A', '#8C8C8C', '#6B8E23', '#B07A4F']

const METRICS = [
    { key: 'cost', label: 'Cost', tripField: 'cost', expenseField: 'valuePln' },
    { key: 'expensed', label: 'Expensed', tripField: 'expensed', expenseField: 'expensedInPln' },
]
const SPLITS = [
    { key: 'expense', label: 'Expense category' },
    { key: 'trip', label: 'Trip category' },
]
const SCOPES = [
    { key: 'all', label: 'All trips', test: () => true },
    { key: 'private', label: 'Private', test: t => t.tripType !== 'Company' },
    { key: 'company', label: 'Company', test: t => t.tripType === 'Company' },
]

const Choices = ({ label, options, value, onChange, style }) => (
    <>
        <span className="filterbar__label" style={style}>{label}</span>
        <div className="choices">
            {options.map(o => (
                <button key={o.key} type="button"
                    className={`choice choice--sm ${o.key === value ? 'is-selected' : ''}`}
                    onClick={() => onChange(o.key)}>
                    {o.label}
                </button>
            ))}
        </div>
    </>
)

function Reports() {
    const [trips, setTrips] = useState(null)
    const [expenses, setExpenses] = useState(null)
    const [metricKey, setMetricKey] = useState(METRICS[0].key)
    const [splitKey, setSplitKey] = useState(SPLITS[0].key)
    const [scopeKey, setScopeKey] = useState(SCOPES[0].key)
    const [error, setError] = useState(null)

    useEffect(() => {
        service.getTripsFullView().then(setTrips).catch(e => setError(e.message))
        service.getAllExpensesFullView().then(setExpenses).catch(e => setError(`Expenses: ${e.response?.status ?? ''} ${e.message}`))
    }, [])

    const metric = METRICS.find(m => m.key === metricKey)

    // years (asc) × groups → PLN sum of the chosen metric
    const { years, groups, matrix, totals, colors } = useMemo(() => {
        const scope = SCOPES.find(s => s.key === scopeKey)
        const tripsInScope = (trips ?? []).filter(scope.test).filter(t => t.start)
        const tripById = new Map(tripsInScope.map(t => [t.tripId, t]))
        const yearOf = (t) => String(t.start).slice(0, 4)

        // rows: { year, group, value }
        const rows = []
        if (splitKey === 'trip') {
            tripsInScope.forEach(t => rows.push({ year: yearOf(t), group: t.tripCategory || NONE, value: t[metric.tripField] || 0 }))
        } else {
            ;(expenses ?? []).forEach(e => {
                const t = tripById.get(e.tripId)
                if (t) rows.push({ year: yearOf(t), group: e.categoryName || NONE, value: e[metric.expenseField] || 0 })
            })
        }

        const matrix = new Map()          // year -> Map(group -> value)
        const groupTotals = new Map()
        rows.forEach(({ year, group, value }) => {
            if (!matrix.has(year)) matrix.set(year, new Map())
            matrix.get(year).set(group, (matrix.get(year).get(group) || 0) + value)
            groupTotals.set(group, (groupTotals.get(group) || 0) + value)
        })
        const years = [...matrix.keys()].sort()

        let groups, colors
        if (splitKey === 'trip') {
            groups = [...TRIP_CATEGORIES, NONE].filter(g => groupTotals.has(g))
            colors = TRIP_CATEGORY_COLORS
        } else {
            groups = [...groupTotals.entries()].sort((a, b) => b[1] - a[1]).map(([g]) => g)
            colors = Object.fromEntries(groups.map((g, i) => [g, g === NONE ? '#B5B5B5' : PALETTE[i % PALETTE.length]]))
        }
        const totals = Object.fromEntries(years.map(y => [y, [...matrix.get(y).values()].reduce((s, v) => s + v, 0)]))
        return { years, groups, matrix, totals, colors }
    }, [trips, expenses, metric, splitKey, scopeKey])

    const series = groups.map(g => ({
        id: g,
        label: g,
        stack: 'total',
        color: colors[g],
        data: years.map(y => matrix.get(y).get(g) || 0),
        valueFormatter: (v) => `${fmtMoney(v)} PLN`,
    }))
    const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0)
    const groupTotal = (g) => years.reduce((s, y) => s + (matrix.get(y).get(g) || 0), 0)
    const loading = !trips || !expenses

    return (
        <section className="page">
            <header className="page__header">
                <div>
                    <Link className="page__back" to="/">← All trips</Link>
                    <h1 className="page__title">Reports</h1>
                    <p className="page__subtitle">{metric.label} per year, split by {SPLITS.find(s => s.key === splitKey).label.toLowerCase()}</p>
                </div>
            </header>

            <div className="filterbar">
                <Choices label="Metric" options={METRICS} value={metricKey} onChange={setMetricKey} />
                <Choices label="Split by" options={SPLITS} value={splitKey} onChange={setSplitKey} style={{ marginLeft: 12 }} />
                <Choices label="Trips" options={SCOPES} value={scopeKey} onChange={setScopeKey} style={{ marginLeft: 12 }} />
            </div>

            <div className="card card--pad chart-card" style={{ justifyContent: 'stretch', alignItems: 'flex-start' }}>
                {years.length > 0 ? (
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: years }]}
                        yAxis={[{ valueFormatter: (v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)) }]}
                        series={series}
                        height={380}
                        margin={{ top: 20, bottom: 30, left: 60, right: 20 }}
                        slotProps={{ legend: { hidden: true } }}
                        sx={{ width: '100%', flex: 1, minWidth: 320 }}
                    />
                ) : (
                    <p className="tbl__empty">{error ? `Could not load report (${error})` : loading ? 'Loading…' : 'No data to report'}</p>
                )}
                {groups.length > 0 && (
                    <ul className="legend">
                        {groups.map(g => (
                            <li key={g} className="legend__item">
                                <span className="swatch" style={{ background: colors[g] }} />
                                <span className="legend__label">{g}</span>
                                <span className="legend__value">{grandTotal ? Math.round(groupTotal(g) / grandTotal * 100) : 0}%</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {years.length > 0 && (
                <div className="card card--scroll" style={{ marginTop: 16 }}>
                    <table className="tbl tbl--dense">
                        <thead>
                            <tr>
                                <th>{splitKey === 'trip' ? 'Trip category' : 'Expense category'}</th>
                                {years.map(y => <th key={y} className="tbl__num">{y}</th>)}
                                <th className="tbl__num">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(g => (
                                <tr key={g}>
                                    <td className="tbl__strong">
                                        <span className="swatch" style={{ background: colors[g] }} />{g}
                                    </td>
                                    {years.map(y => {
                                        const v = matrix.get(y).get(g) || 0
                                        return <td key={y} className={`tbl__num ${v ? '' : 'tbl__muted'}`}>{v ? fmtMoney(v) : '–'}</td>
                                    })}
                                    <td className="tbl__num tbl__strong">{fmtMoney(groupTotal(g))}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Total</td>
                                {years.map(y => <td key={y} className="tbl__num">{fmtMoney(totals[y])}</td>)}
                                <td className="tbl__num">{fmtMoney(grandTotal)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </section>
    )
}

export default Reports
