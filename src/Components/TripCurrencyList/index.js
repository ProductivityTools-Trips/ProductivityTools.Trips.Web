import { useContext, useEffect, useState } from 'react'
import service from '../../services/apiService'
import { CacheContext } from '../../session/CacheContext'

/**
 * Currencies used on a trip with their conversion rate to PLN.
 * Adding happens inline (no separate page needed).
 */
function TripCurrencyList({ tripId }) {
    const cache = useContext(CacheContext)
    const [rows, setRows] = useState(null)
    const [draft, setDraft] = useState({ currencyId: '', value: '' })

    const load = () => service.getTripCurrency(tripId).then(setRows)
    useEffect(() => { load() }, [tripId]) // eslint-disable-line react-hooks/exhaustive-deps

    const used = new Set(rows?.map(r => r.currencyName))
    const available = cache?.currencies?.filter(c => !used.has(c.name)) ?? []
    const canAdd = draft.currencyId !== '' && draft.value !== '' && Number(draft.value) > 0

    const add = async () => {
        await service.saveTripCurrency({ tripId: Number(tripId), currencyId: Number(draft.currencyId), value: Number(draft.value) })
        setDraft({ currencyId: '', value: '' })
        load()
    }
    const remove = async (row) => {
        if (!window.confirm(`Remove ${row.currencyName} from this trip?`)) return
        await service.deleteTripCurrency(row.tripCurrencyId)
        load()
    }

    return (
        <div className="section">
            <div className="section__head">
                <h2 className="section__title">Trip currencies</h2>
                <span className="section__meta">Conversion rate to PLN used for this trip's expenses</span>
            </div>

            <div className="card">
                <table className="tbl tbl--dense">
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th className="tbl__num">1 unit = PLN</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map(r => (
                            <tr key={r.tripCurrencyId}>
                                <td><span className="pill">{r.currencyName}</span></td>
                                <td className="tbl__num">{r.value}</td>
                                <td className="tbl__num">
                                    <button type="button" className="link-btn" onClick={() => remove(r)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                        {rows && rows.length === 0 && (
                            <tr><td colSpan={3} className="tbl__empty">No currencies yet – add the ones you'll pay in.</td></tr>
                        )}
                    </tbody>
                </table>

                <div className="inline-form">
                    <div className="choices">
                        {available.map(c => (
                            <button key={c.currencyId} type="button"
                                className={`choice ${String(draft.currencyId) === String(c.currencyId) ? 'is-selected' : ''}`}
                                onClick={() => setDraft(d => ({ ...d, currencyId: c.currencyId }))}>
                                {c.name}
                            </button>
                        ))}
                        {available.length === 0 && <span className="section__meta">All currencies added</span>}
                    </div>
                    <div className="field__input">
                        <input type="number" step="0.0001" min="0" inputMode="decimal" placeholder="Rate"
                            value={draft.value}
                            onChange={e => setDraft(d => ({ ...d, value: e.target.value }))} />
                        <span className="field__adornment">PLN</span>
                    </div>
                    <button type="button" className="btn btn--primary btn--sm" disabled={!canAdd} onClick={add}
                        style={{ opacity: canAdd ? 1 : .5 }}>
                        ＋ Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TripCurrencyList