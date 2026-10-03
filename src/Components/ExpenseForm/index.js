import { useContext } from 'react'
import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { CacheContext } from '../../session/CacheContext'

/** Explanations shown under each amount field. */
export const AMOUNT_HELP = {
    value: <>Full amount from the receipt, in the selected currency – everything that was paid, regardless of who paid or for whom.</>,
    expensed: <>The part of <strong>Value</strong> that counts as this trip's cost. <strong>0</strong> if it was paid by a friend.</>,
    familyCost: <>The part of <strong>Value</strong> spent on your family only – excludes anything bought for friends or other people.</>,
    friendsDebit: <>Money settled with friends. <strong>Positive</strong> when you paid for a friend (they owe you). <strong>Negative</strong> when a friend paid for you (you owe them).</>,
}

function NumberField({ name, label, value, onChange, adornment, hint, onClear, onCopy }) {
    return (
        <div className="field">
            <label className="field__label" htmlFor={`f-${name}`}>
                <span>{label}</span>
                <span>
                    {onCopy && <button type="button" className="link-btn" onClick={onCopy}>Copy to all</button>}
                    {onClear && <button type="button" className="link-btn" onClick={onClear} style={{ marginLeft: 12 }}>Clear</button>}
                </span>
            </label>
            <div className="field__input">
                <input
                    id={`f-${name}`}
                    name={name}
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={value ?? ''}
                    onChange={onChange}
                />
                {adornment && <span className="field__adornment">{adornment}</span>}
            </div>
            {hint && <p className="field__hint">{hint}</p>}
        </div>
    )
}

/**
 * Shared add/edit expense form. Controlled via `expense` / `setExpense`.
 */
function ExpenseForm({ expense, setExpense, onSave, onClose, onDelete, saveLabel = 'Save' }) {
    const cache = useContext(CacheContext)
    const currency = cache?.currencies?.find(c => c.currencyId === expense?.currencyId)?.name

    const set = (patch) => setExpense(prev => ({ ...prev, ...patch }))
    const handleChange = (e) => {
        const { name, value } = e.target
        set({ [name]: value })
    }
    const copyValue = () => set({ expensed: expense.value, familyCost: expense.value, friendsDebit: expense.value })

    if (!expense) return null

    return (
        <div className="card card--pad">
            <div className="form">
                <section className="form__section">
                    <h2 className="form__section-title">Details</h2>
                    <div className="form__grid form__grid--2">
                        <div className="field">
                            <label className="field__label" htmlFor="f-name">Name</label>
                            <div className="field__input">
                                <input id="f-name" name="name" type="text" placeholder="e.g. Dinner at the harbour"
                                    value={expense.name ?? ''} onChange={handleChange} autoFocus />
                            </div>
                        </div>
                        <div className="field">
                            <span className="field__label">Date</span>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    inputFormat="YYYY.MM.DD"
                                    mask="____.__.__"
                                    value={expense.date ?? null}
                                    onChange={(v) => v && set({ date: v.format('yyyy-MM-DD') })}
                                    renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                </section>

                <section className="form__section">
                    <h2 className="form__section-title">Currency</h2>
                    <div className="choices">
                        {cache?.currencies?.map(c => (
                            <button key={c.currencyId} type="button"
                                className={`choice ${expense.currencyId === c.currencyId ? 'is-selected' : ''}`}
                                onClick={() => set({ currencyId: c.currencyId })}>
                                {c.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="form__section">
                    <h2 className="form__section-title">Category</h2>
                    <div className="choices">
                        {cache?.categories?.map(c => (
                            <button key={c.categoryId} type="button"
                                className={`choice ${expense.categoryId === c.categoryId ? 'is-selected' : ''}`}
                                onClick={() => set({ categoryId: c.categoryId })}>
                                {c.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="form__section">
                    <h2 className="form__section-title">Amounts</h2>
                    <div className="form__grid form__grid--2">
                        <NumberField name="value" label="Value" adornment={currency}
                            value={expense.value} onChange={handleChange}
                            hint={AMOUNT_HELP.value} onCopy={copyValue} />
                        <NumberField name="expensed" label="Expensed" adornment={currency}
                            value={expense.expensed} onChange={handleChange}
                            hint={AMOUNT_HELP.expensed} onClear={() => set({ expensed: 0 })} />
                        <NumberField name="familyCost" label="Family cost" adornment={currency}
                            value={expense.familyCost} onChange={handleChange}
                            hint={AMOUNT_HELP.familyCost} onClear={() => set({ familyCost: 0 })} />
                        <NumberField name="friendsDebit" label="Friends debit" adornment={currency}
                            value={expense.friendsDebit} onChange={handleChange}
                            hint={AMOUNT_HELP.friendsDebit} onClear={() => set({ friendsDebit: 0 })} />
                    </div>
                    <div className="callout">
                        <strong>Tip:</strong> for a typical purchase just fill <strong>Value</strong> and press <em>Copy to all</em> –
                        then adjust only the fields that differ. If a friend covered the bill, enter the amount in
                        <strong> Friends debit</strong> with a minus sign, e.g. <code>-120</code>.
                    </div>
                </section>

                <footer className="form__footer">
                    <div>
                        {onDelete && <button type="button" className="btn btn--danger" onClick={onDelete}>Delete</button>}
                    </div>
                    <div className="form__footer-right">
                        <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn--primary" onClick={onSave}>{saveLabel}</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default ExpenseForm
