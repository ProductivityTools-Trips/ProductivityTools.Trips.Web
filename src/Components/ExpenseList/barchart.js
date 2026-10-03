import { useMemo } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { fmtMoney } from '../../utils/format'

/**
 * Expensed-in-PLN breakdown per category for the expenses flagged `checked`.
 * (Name kept for backwards compatibility – it renders a pie, not a bar chart.)
 */
function BarChart({ expenses }) {
    const data = useMemo(() => {
        const byCat = new Map()
        expenses?.forEach(e => {
            if (!e.checked) return
            byCat.set(e.categoryName, (byCat.get(e.categoryName) || 0) + (e.expensedInPln || 0))
        })
        return [...byCat.entries()]
            .map(([id, value]) => ({ id, label: id, value }))
            .sort((a, b) => b.value - a.value)
    }, [expenses])

    const total = data.reduce((s, d) => s + d.value, 0)

    if (!expenses?.length) return null

    return (
        <div className="section">
            <div className="section__head">
                <h2 className="section__title">By category</h2>
                <span className="section__meta">{fmtMoney(total)} PLN in selected expenses</span>
            </div>

            <div className="cols cols--2">
                <div className="card">
                    <table className="tbl tbl--dense">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th className="tbl__num">Expensed PLN</th>
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