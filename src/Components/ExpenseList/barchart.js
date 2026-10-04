import { useMemo, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { fmtMoney } from '../../utils/format'

/** Which PLN figure the breakdown is based on. */
const METRICS = [
    { key: 'expensedInPln', label: 'Expensed PLN', column: 'Expensed PLN' },
    { key: 'valuePln', label: 'Value PLN', column: 'Value PLN' },
]

/**
 * Per-category breakdown (table + donut) of the expenses flagged `checked`,
 * switchable between Expensed in PLN and Value in PLN.
 * (Name kept for backwards compatibility – it renders a pie, not a bar chart.)
 */
function BarChart({ expenses }) {
    const [metricKey, setMetricKey] = useState(METRICS[0].key)
    const metric = METRICS.find(m => m.key === metricKey)

    const data = useMemo(() => {
        const byCat = new Map()
        expenses?.forEach(e => {
            if (!e.checked) return
            byCat.set(e.categoryName, (byCat.get(e.categoryName) || 0) + (e[metricKey] || 0))
        })
        return [...byCat.entries()]
            .map(([id, value]) => ({ id, label: id, value }))
            .sort((a, b) => b.value - a.value)
    }, [expenses, metricKey])

    const total = data.reduce((s, d) => s + d.value, 0)

    if (!expenses?.length) return null

    return (
        <div className="section">
            <div className="section__head">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <h2 className="section__title">By category</h2>
                    <div className="choices">
                        {METRICS.map(m => (
                            <button key={m.key} type="button"
                                className={`choice choice--sm ${m.key === metricKey ? 'is-selected' : ''}`}
                                onClick={() => setMetricKey(m.key)}>
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>
                <span className="section__meta">{fmtMoney(total)} PLN in selected expenses</span>
            </div>

            <div className="cols cols--2">
                <div className="card">
                    <table className="tbl tbl--dense">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th className="tbl__num">{metric.column}</th>
                                <th className="tbl__num">Share</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(d => (
                                <tr key={d.id}>
                                    <td><span className="pill">{d.label}</span></td>
                                    <td className="tbl__num">{fmtMoney(d.value)}</td>
                                    <td className="tbl__num tbl__muted">{total ? Math.round(d.value / total * 100) : 0}%</td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr><td colSpan={3} className="tbl__empty">Select expenses to see the breakdown</td></tr>
                            )}
                        </tbody>
                        {data.length > 0 && (
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td className="tbl__num">{fmtMoney(total)}</td>
                                    <td className="tbl__num">100%</td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>

                <div className="card card--pad" style={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart
                        series={[{ data, innerRadius: 50, paddingAngle: 1, cornerRadius: 3 }]}
                        width={320}
                        height={240}
                        slotProps={{ legend: { hidden: true } }}
                    />
                </div>
            </div>
        </div>
    )
}

export default BarChart