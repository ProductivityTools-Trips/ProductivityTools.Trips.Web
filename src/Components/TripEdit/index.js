import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import service from '../../services/apiService'
import TripCurrencyList from '../TripCurrencyList'
import { DEFAULT_TRIP_TYPE, TRIP_TYPES } from '../../utils/tripTypes'

moment.locale('en', { week: { dow: 1 } })

const ISO = 'yyyy-MM-DD'

function DateField({ label, value, onChange }) {
    return (
        <div className="field">
            <span className="field__label">{label}</span>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    inputFormat="YYYY.MM.DD"
                    mask="____.__.__"
                    value={value ?? null}
                    onChange={(v) => v && v.isValid() && onChange(v)}
                    renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                />
            </LocalizationProvider>
        </div>
    )
}

function TripEdit({ mode }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = mode === 'edit'
    const [trip, setTrip] = useState(null)

    useEffect(() => {
        if (isEdit) {
            service.getTrip(id).then(setTrip)
        } else {
            const today = moment().format(ISO)
            setTrip({ start: today, end: today, days: 1, nights: 0, tripType: DEFAULT_TRIP_TYPE })
        }
    }, [isEdit, id])

    const set = (patch) => setTrip(prev => ({ ...prev, ...patch }))
    const handleChange = (e) => set({ [e.target.name]: e.target.value })

    /** Keep days/nights in sync with the date range. */
    const setDates = (start, end) => {
        const s = moment(start), e = moment(end)
        const nights = Math.max(0, e.diff(s, 'days'))
        set({ start: s.format(ISO), end: e.format(ISO), nights, days: nights + 1 })
    }

    const back = isEdit ? `/tripdetail/${id}` : '/'
    const close = () => navigate(back, { replace: true })
    const save = async () => {
        if (isEdit) await service.saveTrip(trip)
        else await service.addTrip(trip)
        close()
    }

    return (
        <section className="page">
            <header className="page__header">
                <div>
                    <Link className="page__back" to={back}>← {isEdit ? (trip?.name ?? 'Trip') : 'All trips'}</Link>
                    <h1 className="page__title">{isEdit ? 'Edit trip' : 'New trip'}</h1>
                    {isEdit && trip && <p className="page__subtitle">{trip.name}</p>}
                </div>
            </header>

            {trip && (
                <div className="card card--pad">
                    <div className="form">
                        <section className="form__section">
                            <h2 className="form__section-title">Details</h2>
                            <div className="field">
                                <label className="field__label" htmlFor="t-name">Name</label>
                                <div className="field__input">
                                    <input id="t-name" name="name" type="text" placeholder="e.g. Costa Toscana"
                                        value={trip.name ?? ''} onChange={handleChange} autoFocus={!isEdit} />
                                </div>
                            </div>
                            <div className="field">
                                <span className="field__label">Type</span>
                                <div className="choices">
                                    {TRIP_TYPES.map(t => (
                                        <button key={t} type="button"
                                            className={`choice ${(trip.tripType ?? DEFAULT_TRIP_TYPE) === t ? 'is-selected' : ''}`}
                                            onClick={() => set({ tripType: t })}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <p className="field__hint">
                                    Decides which expense fields are used: <strong>Family</strong> – Value &amp; Expensed
                                    (Family cost follows Expensed), <strong>Friends</strong> – all fields,
                                    <strong> Company</strong> – Value &amp; Expensed only.
                                </p>
                            </div>
                            <div className="form__grid form__grid--2">
                                <DateField label="From" value={trip.start} onChange={(v) => setDates(v, moment.max(v, moment(trip.end)))} />
                                <DateField label="To" value={trip.end} onChange={(v) => setDates(moment.min(v, moment(trip.start)), v)} />
                            </div>
                            <div className="form__grid form__grid--2">
                                <div className="field">
                                    <label className="field__label" htmlFor="t-days">Days</label>
                                    <div className="field__input">
                                        <input id="t-days" name="days" type="number" min="0" value={trip.days ?? ''} onChange={handleChange} />
                                    </div>
                                    <p className="field__hint">Calculated from the dates – override if needed.</p>
                                </div>
                                <div className="field">
                                    <label className="field__label" htmlFor="t-nights">Nights</label>
                                    <div className="field__input">
                                        <input id="t-nights" name="nights" type="number" min="0" value={trip.nights ?? ''} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="form__section">
                            <h2 className="form__section-title">Notes</h2>
                            <div className="field">
                                <label className="field__label" htmlFor="t-desc">Description</label>
                                <div className="field__input field__input--area">
                                    <textarea id="t-desc" name="description" rows={4} placeholder="Where, with whom, highlights…"
                                        value={trip.description ?? ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="field__label" htmlFor="t-learn">Learnings</label>
                                <div className="field__input field__input--area">
                                    <textarea id="t-learn" name="learnings" rows={4} placeholder="What to do differently next time"
                                        value={trip.learnings ?? ''} onChange={handleChange} />
                                </div>
                            </div>
                        </section>

                        <footer className="form__footer">
                            <div />
                            <div className="form__footer-right">
                                <button type="button" className="btn btn--ghost" onClick={close}>Cancel</button>
                                <button type="button" className="btn btn--primary" onClick={save}>
                                    {isEdit ? 'Save changes' : 'Create trip'}
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}

            {isEdit && <TripCurrencyList tripId={id} />}
        </section>
    )
}

export default TripEdit